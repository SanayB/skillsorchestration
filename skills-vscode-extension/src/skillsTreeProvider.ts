/**
 * Renders the Skills Library sidebar: one top-level tree item per skill,
 * expandable to show its reference files as children. Reference files are
 * browsable/previewable but are not separately insertable — inserting
 * always happens at the skill level (see extension.ts), so "what does it
 * mean to insert this skill" never depends on which tree node you clicked.
 */

import * as vscode from "vscode";
import { discoverSkills, SkillInfo } from "./skills";

export type SkillTreeNode =
  | { kind: "skill"; skill: SkillInfo }
  | { kind: "reference"; skillName: string; fileName: string; filePath: string };

export class SkillsTreeDataProvider implements vscode.TreeDataProvider<SkillTreeNode> {
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<
    SkillTreeNode | undefined | void
  >();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private skills: SkillInfo[] = [];
  private lastError: string | undefined;

  constructor(private getSkillsPath: () => string) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  /** Re-reads the skills folder from disk. Called on refresh and on activation. */
  async reload(): Promise<void> {
    const skillsPath = this.getSkillsPath();
    if (!skillsPath) {
      this.skills = [];
      this.lastError = undefined; // handled as a distinct "not configured" state, not an error
      this.refresh();
      return;
    }
    try {
      this.skills = await discoverSkills(skillsPath);
      this.lastError = undefined;
    } catch (err) {
      this.skills = [];
      this.lastError = err instanceof Error ? err.message : String(err);
    }
    this.refresh();
  }

  getSkillByName(name: string): SkillInfo | undefined {
    return this.skills.find((s) => s.name === name);
  }

  getTreeItem(element: SkillTreeNode): vscode.TreeItem {
    if (element.kind === "skill") {
      const item = new vscode.TreeItem(
        element.skill.name,
        element.skill.referenceFiles.length > 0
          ? vscode.TreeItemCollapsibleState.Collapsed
          : vscode.TreeItemCollapsibleState.None
      );
      item.id = `skill:${element.skill.name}`;
      item.contextValue = "skill";
      item.tooltip = new vscode.MarkdownString(
        `**${element.skill.name}**\n\n${element.skill.description}`
      );
      item.description = truncate(element.skill.description, 60);
      item.iconPath = new vscode.ThemeIcon("book");
      item.command = {
        command: "skillsLibrary.preview",
        title: "Preview",
        arguments: [element],
      };
      return item;
    }

    // reference file node
    const item = new vscode.TreeItem(element.fileName, vscode.TreeItemCollapsibleState.None);
    item.id = `ref:${element.skillName}/${element.fileName}`;
    item.contextValue = "reference";
    item.iconPath = new vscode.ThemeIcon("file");
    item.tooltip = `${element.skillName}/references/${element.fileName}`;
    item.command = {
      command: "skillsLibrary.preview",
      title: "Preview",
      arguments: [element],
    };
    return item;
  }

  getChildren(element?: SkillTreeNode): vscode.ProviderResult<SkillTreeNode[]> {
    if (!this.getSkillsPath()) {
      return []; // empty state is rendered via the view's `viewsWelcome`-style messaging in extension.ts
    }

    if (!element) {
      return this.skills.map((skill) => ({ kind: "skill", skill }));
    }

    if (element.kind === "skill") {
      return element.skill.referenceFiles.map((ref) => ({
        kind: "reference" as const,
        skillName: element.skill.name,
        fileName: ref.name,
        filePath: ref.path,
      }));
    }

    return [];
  }

  getLastError(): string | undefined {
    return this.lastError;
  }

  getSkillCount(): number {
    return this.skills.length;
  }
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}
