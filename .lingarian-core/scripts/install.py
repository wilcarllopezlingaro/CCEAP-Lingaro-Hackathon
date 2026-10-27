"""
Script, just to avoid copying errors, run: uv run --with 'Jinja2' .lingarian-core/scripts/install.py

TODO: Create a proper installation script.
"""
import shutil
from pathlib import Path

import jinja2

GITHUB_TEMPLATE = """---
description: "Activates the Developer agent persona."
tools: ['changes', 'codebase', 'fetch', 'findTestFiles', 'githubRepo', 'problems', 'usages', 'editFiles', 'runCommands', 'runTasks', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure']
---
# {{ agent_name }}

{{ agent_description }}

"""

CLAUDE_CODE_TEMPLATE = """# {{ agent_name }} Agent

{{ agent_description }}
"""

ROOT_PATH = Path(__file__).parent.parent


def install_github():
    template = jinja2.Template(GITHUB_TEMPLATE)

    for agent_path in ROOT_PATH.glob("agents/*"):
        agent_name = agent_path.name.replace(".md", "")
        target_agent_name = agent_name.replace("-", " ").title().replace(" ", "")

        print(f"Installing GitHub integration for {target_agent_name}...")

        target_dir = ROOT_PATH.parent / ".github" / "chatmodes"
        target_dir.mkdir(parents=True, exist_ok=True)

        target_agent_path = target_dir / f"{target_agent_name}.chatmode.md"

        with open(agent_path, "r") as f:
            agent_description = f.read()

        with open(target_agent_path, "w") as f:
            data = template.render(
                agent_name=target_agent_name,
                agent_description=agent_description,
            )
            f.write(data)


def install_claude_code():
    template = jinja2.Template(CLAUDE_CODE_TEMPLATE)

    target_dir = ROOT_PATH.parent / ".claude" / "commands" / "LingarIAn" / "agents"
    target_dir.mkdir(parents=True, exist_ok=True)

    for agent_path in ROOT_PATH.glob("agents/*"):
        agent_name = agent_path.name.replace(".md", "").replace("-", " ").title()
        print(f"Installing Claude integration for {agent_name}...")
        with open(agent_path, "r") as f:
            agent_description = f.read()

        with open(target_dir / agent_path.name, "w") as f:
            data = template.render(
                agent_name=agent_name,
                agent_description=agent_description,
            )
            f.write(data)

def install_cline():
    target_dir = ROOT_PATH.parent / ".clinerules"
    target_dir.mkdir(parents=True, exist_ok=True)

    for agent_path in ROOT_PATH.glob("agents/*"):
        agent_name = agent_path.name.replace(".md", "").replace("-", " ").title()
        print(f"Installing Cline integration for {agent_name}...")
        shutil.copy(agent_path, target_dir / agent_path.name)


def main() -> None:
    install_github()
    install_claude_code()
    install_cline()


if __name__ == "__main__":
    main()
