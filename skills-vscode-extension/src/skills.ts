/**
 * Filesystem logic for discovering and reading skills from the configured
 * skills folder. This deliberately mirrors skills.ts in skills-mcp-server —
 * same discovery rules, same "what counts as a skill" definition — so the
 * VS Code extension and the MCP server never disagree about what's available.
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";

const SKILL_FILE_NAME = "SKILL.md";
const REFERENCES_DIR_NAME = "references";

export interface SkillInfo {
  name: string;
  description: string;
  skillMdPath: string;
  referenceFiles: { name: string; path: string }[];
}

/** Parses the `description:` field out of a SKILL.md file's YAML frontmatter. */
function parseDescription(skillMdContent: string): string {
  const frontmatterMatch = skillMdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    return "(no description found in this skill's frontmatter)";
  }
  const descriptionMatch = frontmatterMatch[1].match(/^description:\s*(.+)$/m);
  return descriptionMatch ? descriptionMatch[1].trim() : "(no description field found)";
}

async function isDirectory(p: string): Promise<boolean> {
  try {
    return (await fs.stat(p)).isDirectory();
  } catch {
    return false;
  }
}

async function isFile(p: string): Promise<boolean> {
  try {
    return (await fs.stat(p)).isFile();
  } catch {
    return false;
  }
}

async function listReferenceFiles(
  skillsPath: string,
  skillName: string
): Promise<{ name: string; path: string }[]> {
  const referencesDir = path.join(skillsPath, skillName, REFERENCES_DIR_NAME);
  if (!(await isDirectory(referencesDir))) {
    return [];
  }
  const entries = await fs.readdir(referencesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => ({ name: e.name, path: path.join(referencesDir, e.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Discovers every skill in skillsPath: a direct subdirectory counts as a
 * skill only if it contains a SKILL.md file. Anything else is silently
 * skipped (a folder with no SKILL.md yet, .git, stray files, etc.) rather
 * than causing an error — the skills folder is allowed to contain
 * in-progress or unrelated things without breaking discovery.
 */
export async function discoverSkills(skillsPath: string): Promise<SkillInfo[]> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(skillsPath, { withFileTypes: true });
  } catch (err) {
    throw new Error(
      `Could not read skills folder "${skillsPath}". ` +
        `Check Skills Library settings and confirm the path exists. ` +
        `(${err instanceof Error ? err.message : String(err)})`
    );
  }

  const candidateDirs = entries.filter((e) => e.isDirectory() && !e.name.startsWith("."));

  const skills: SkillInfo[] = [];
  for (const dir of candidateDirs) {
    const skillMdPath = path.join(skillsPath, dir.name, SKILL_FILE_NAME);
    if (!(await isFile(skillMdPath))) {
      continue;
    }
    const content = await fs.readFile(skillMdPath, "utf-8");
    skills.push({
      name: dir.name,
      description: parseDescription(content),
      skillMdPath,
      referenceFiles: await listReferenceFiles(skillsPath, dir.name),
    });
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns the full content of one skill: its SKILL.md plus every reference
 * file, concatenated with clear delimiters — identical in shape to
 * get_skill's output in skills-mcp-server, so a skill "means the same thing"
 * whether you're inserting it here or fetching it through the MCP server.
 */
export async function getFullSkillContent(skill: SkillInfo): Promise<string> {
  const sections: string[] = [];

  const routerContent = await fs.readFile(skill.skillMdPath, "utf-8");
  sections.push(`--- ${skill.name}/SKILL.md ---\n\n${routerContent.trim()}`);

  for (const ref of skill.referenceFiles) {
    const refContent = await fs.readFile(ref.path, "utf-8");
    sections.push(`--- ${skill.name}/references/${ref.name} ---\n\n${refContent.trim()}`);
  }

  return sections.join("\n\n");
}
