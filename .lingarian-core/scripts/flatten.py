#!/usr/bin/env python3
"""
Simplified source code flattener to XML.
Supports only Git repositories.
"""

import subprocess
import sys
import os
import io
import argparse
from pathlib import Path
import xml.etree.ElementTree as ET
import xml.sax.saxutils as saxutils
import fnmatch


def load_ignore_patterns(root_dir):
    """Load ignore patterns from .lingarian-flattener-ignore file."""
    ignore_file = os.path.join(root_dir, ".lingarian-flattener-ignore")
    patterns = []

    if os.path.exists(ignore_file):
        try:
            with open(ignore_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    # Skip empty lines and comments
                    if line and not line.startswith("#"):
                        patterns.append(line)
        except Exception as e:
            print(f"Could not read {ignore_file}: {e}")
            sys.exit(1)

    return patterns


def check_for_nested_ignore_files(git_files):
    """Check for nested .lingarian-flattener-ignore files and handle them."""
    nested_ignore_files = []

    for file_path in git_files:
        if file_path.endswith(".lingarian-flattener-ignore") and "/" in file_path:
            nested_ignore_files.append(file_path)

    if nested_ignore_files:
        print("❌ Error: Nested .lingarian-flattener-ignore files detected:")
        print("=" * 60)
        for nested_file in nested_ignore_files:
            print(f"  {nested_file}")
        print("=" * 60)
        print(
            "This flattener only supports .lingarian-flattener-ignore in the root directory.\n"
            "Unlike gitignore, nested ignore files are not supported for simplicity. \n"
            "Move all ignore patterns to the root .lingarian-flattener-ignore file or \n"
            "use --ignore-nested-ignore-files flag to suppress this error"
        )
        sys.exit(1)

    return nested_ignore_files


def should_ignore_file(file_path, ignore_patterns):
    """Check if file should be ignored based on patterns."""
    # Convert to relative path with forward slashes for consistency
    normalized_path = file_path.replace("\\", "/")

    for pattern in ignore_patterns:
        # Handle directory patterns ending with /
        if pattern.endswith("/"):
            # Check if file is in this directory
            dir_pattern = pattern.rstrip("/")
            if fnmatch.fnmatch(normalized_path, f"{dir_pattern}/*") or fnmatch.fnmatch(
                normalized_path, dir_pattern
            ):
                return True
        else:
            # Handle file patterns
            if fnmatch.fnmatch(normalized_path, pattern):
                return True

            # Handle directory patterns without trailing slash
            # Check if file path starts with pattern/ (directory match)
            if normalized_path.startswith(pattern + "/"):
                return True

            # Also check basename for patterns without path separators
            if "/" not in pattern and fnmatch.fnmatch(
                os.path.basename(normalized_path), pattern
            ):
                return True

    return False


def escape_xml(text):
    """Escape XML special characters."""
    if not isinstance(text, str):
        text = str(text)
    return saxutils.escape(text, {"'": "&apos;"})


def needs_cdata(content):
    """Check if content needs CDATA wrapper."""
    return (
        "<" in content
        or "&" in content
        or "]]>" in content
        or content.strip() != content
    )  # Has leading/trailing whitespace


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Flatten source code repository to XML format",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    parser.add_argument(
        "input",
        nargs="?",
        default=".",
        help="Input directory (default: current directory)",
    )

    parser.add_argument(
        "-o",
        "--output",
        help="Output XML file",
    )

    parser.add_argument(
        "--console",
        action="store_true",
        help="Print XML content to console instead of file",
    )

    parser.add_argument(
        "--ignore-nested-ignore-files",
        action="store_true",
        help="Ignore nested .lingarian-flattener-ignore files (only use root level)",
    )

    args = parser.parse_args()
    if not os.path.exists(args.input):
        parser.error(f"Input directory does not exist: {args.input}")

    if not args.output and not args.console:
        parser.error("At least one of --output/-o or --console must be specified.")

    if args.output:
        args.output = os.path.abspath(args.output)

    return args


def guard_git_repo_clean():
    """Guard: Ensure we are in a Git repository and there are no uncommitted changes."""
    try:
        subprocess.run(
            ["git", "rev-parse", "--git-dir"],
            capture_output=True,
            check=True,
            text=True,
        )

        result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            check=True,
            text=True,
        )

        if result.stdout.strip():
            print("❌ Error: Repository has uncommitted changes")
            print("Please commit or stash changes before running the flattener.")
            sys.exit(1)

    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Error: Not a Git repository or Git is not installed")
        sys.exit(1)


def get_git_files():
    """Get list of tracked files from git ls-files."""
    try:
        result = subprocess.run(
            ["git", "ls-files"],
            capture_output=True,
            check=True,
            text=True,
        )
        files = [f.strip() for f in result.stdout.splitlines() if f.strip()]
        return files

    except subprocess.CalledProcessError as e:
        print(f"Error getting Git files: {e}")
        sys.exit(1)


def is_binary_file(file_path):
    """Classify file as binary based on extension."""
    binary_extensions = {
        # Images
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".ico",
        ".svg",
        ".webp",
        # Documents
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        # Archives
        ".zip",
        ".tar",
        ".gz",
        ".rar",
        ".7z",
        ".bz2",
        # Executable:
        ".exe",
        ".dll",
        ".so",
        ".dylib",
        ".bin",
        # Media
        ".mp3",
        ".mp4",
        ".avi",
        ".mov",
        ".wav",
        ".mkv",
        # Fonts
        ".ttf",
        ".otf",
        ".woff",
        ".woff2",
        # Databases
        ".db",
        ".sqlite",
        ".sqlite3",
        # Others
        ".pyc",
        ".pyo",
        ".class",
        ".jar",
    }

    extension = Path(file_path).suffix.lower()
    return extension in binary_extensions


def read_file_content(file_path):
    """Read text file content with UTF-8 encoding only."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except UnicodeDecodeError as e:
        raise ValueError(f"File {file_path} is not UTF-8 encoded: {e}")
    except Exception as e:
        raise IOError(f"Error reading {file_path}: {e}")


def classify_files(file_paths, ignore_patterns):
    """Classify files into text and binary, applying ignore patterns."""
    text_files = []
    binary_files = []
    errors = []
    ignored_count = 0

    for file_path in file_paths:
        if not os.path.exists(file_path):
            errors.append(f"{file_path}: File does not exist")
            continue

        # Check if file should be ignored
        if should_ignore_file(file_path, ignore_patterns):
            ignored_count += 1
            continue

        if is_binary_file(file_path):
            binary_files.append(file_path)
        else:
            text_files.append(file_path)

    return text_files, binary_files, errors


def process_text_files(text_files):
    """Process text files and collect any errors."""
    processed_files = []
    errors = []

    for file_path in text_files:
        try:
            content = read_file_content(file_path)
            processed_files.append((file_path, content))
        except (ValueError, IOError) as e:
            errors.append(str(e))

    return processed_files, errors


def create_xml_output(processed_text_files, binary_files, output_path=None):
    """Create XML file with file contents using manual XML generation for better control."""

    def write_xml_content(output_file):
        output_file.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        output_file.write("<files>\n")

        # Add text files with content
        for file_path, content in sorted(processed_text_files):
            escaped_path = escape_xml(file_path)

            if len(content) == 0:
                # Empty file - self-closing tag
                output_file.write(f'  <file path="{escaped_path}" type="text"/>\n')
            elif needs_cdata(content):
                # Use CDATA for complex content
                output_file.write(
                    f'  <file path="{escaped_path}" type="text"><![CDATA['
                )
                # Escape any ]]> sequences in content
                safe_content = content.replace("]]>", "]]]]><![CDATA[>")
                output_file.write(safe_content)
                output_file.write("]]></file>\n")
            else:
                # Simple escaped content
                output_file.write(f'  <file path="{escaped_path}" type="text">')
                output_file.write(escape_xml(content))
                output_file.write("</file>\n")

        # Add binary files without content
        for file_path in sorted(binary_files):
            escaped_path = escape_xml(file_path)
            try:
                size = os.path.getsize(file_path)
                output_file.write(
                    f'  <file path="{escaped_path}" type="binary" size="{size}"/>\n'
                )
            except OSError:
                output_file.write(f'  <file path="{escaped_path}" type="binary"/>\n')

        output_file.write("</files>\n")

    buffer = io.StringIO()
    write_xml_content(buffer)
    return buffer.getvalue()


def print_errors_and_exit(errors):
    """Print all errors and exit the program."""
    print(f"❌ Fatal errors occurred ({len(errors)} files):")
    print("=" * 60)
    for error in errors:
        print(f"  {error}")
    print("=" * 60)
    print("Flattening aborted due to errors.")
    print("Please fix the issues above and try again.")
    sys.exit(1)


def main():
    """Main program function."""
    args = parse_args()

    os.chdir(args.input)

    guard_git_repo_clean()
    git_files = get_git_files()

    if not git_files:
        print("❌ No files found in repository")
        sys.exit(1)

    if not args.ignore_nested_ignore_files:
        check_for_nested_ignore_files(git_files)

    text_files, binary_files, classification_errors = classify_files(
        git_files,
        ignore_patterns=load_ignore_patterns("."),
    )

    processed_text_files, processing_errors = process_text_files(text_files)

    all_errors = classification_errors + processing_errors

    if all_errors:
        print_errors_and_exit(all_errors)

    xml_output = create_xml_output(processed_text_files, binary_files, args.output)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(xml_output)

    if args.console:
        print(xml_output)


if __name__ == "__main__":
    main()
