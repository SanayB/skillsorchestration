# Skills Library — VS Code extension

A sidebar for browsing your personal `SKILL.md` library and inserting any skill's full
content directly into the editor at your cursor. Reads from the same `skills/` folder
your `skills-mcp-server` uses — one folder, two ways to use it.

## What it does

- **Activity Bar icon** → opens a tree view of every skill in your configured folder.
- **Click a skill** (or one of its reference files) → opens a read-only preview tab.
- **Insert** (the inline icon on a skill, or the command palette) → inserts that skill's
  full content — its `SKILL.md` plus every file in its `references/` folder, concatenated
  — at the cursor position in whichever text editor you were last working in.
- **Auto-refreshes** when files change in the skills folder, so adding a 7th skill (or
  editing an existing one) shows up without needing to reload VS Code.

This is a browsing/insertion tool, not an AI integration — it doesn't talk to Copilot
Chat or any model directly. It puts the right skill content where you (or whatever
assistant you're using inside VS Code) can use it.

## Setup

### 1. Install dependencies and build

```bash
npm install
npm run build
```

### 2. Run it

Press **F5** in VS Code (with this folder open) to launch an Extension Development Host
window with the extension active. This is the normal way to run and iterate on a VS Code
extension before packaging it.

### 3. Point it at your skills folder

Run the command **"Skills: Set Skills Folder Location"** from the Command Palette
(`Cmd+Shift+P` / `Ctrl+Shift+P`), and enter the absolute path to your `skills/` folder —
the same folder you point `SKILLS_PATH` at for `skills-mcp-server`.

Alternatively, set it directly in `settings.json`:

```json
{
  "skillsLibrary.skillsPath": "/absolute/path/to/skills"
}
```

The Skills Library icon should now appear in the Activity Bar, showing your skills.

## Packaging (to install permanently, without F5 each time)

```bash
npm install -g @vscode/vsce   # if you don't already have it
npm run package               # produces skills-library-1.0.0.vsix
```

Then in VS Code: Extensions view → `...` menu → **Install from VSIX...** → select the
generated file. The extension will now load automatically every time VS Code starts,
without needing the Extension Development Host.

## Commands

| Command | What it does |
|---|---|
| `Skills: Set Skills Folder Location` | Prompts for the absolute path to your skills folder |
| `Skills: Refresh` | Re-reads the skills folder from disk (also happens automatically on file changes) |
| `Skills: Preview` | Opens the clicked skill or reference file in a read-only tab |
| `Skills: Insert at Cursor` | Inserts a skill's full content at the cursor in your last-active editor. With nothing selected in the tree, this opens a quick-pick of all skills. |

## Why insert always operates on the whole skill, not individual reference files

Reference files are browsable and previewable individually, but **Insert always inserts
the whole skill** — its router plus every reference file — to keep one consistent
definition of "what a skill is" between this extension and `skills-mcp-server`'s
`get_skill` tool. The trade-off (you can't insert just `react.md` without the other four
frontend stack files coming along) is intentional: simplicity and consistency over
fine-grained control, for what's a personal tool used by one person.

## Notes on "last active editor"

Because clicking around the sidebar or a preview tab changes VS Code's notion of the
"active editor," this extension tracks the most recently focused *real file* editor
separately, so clicking a skill to preview it doesn't lose track of where you actually
want the content inserted. If you haven't had a real file open yet in the session,
"Insert" will ask you to open one first rather than silently failing or inserting
somewhere unexpected.
