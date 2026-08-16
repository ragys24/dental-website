#!/usr/bin/env python3
"""
Replace local TEAL/GOLD/CREAM color constant definitions with COLORS imports from constants.ts.
Handles the local alias pattern: const TEAL = COLORS.teal (About.tsx style) and
the raw oklch string pattern: const TEAL = "oklch(...)".
"""
import os
import re

SRC_DIR = "/home/ubuntu/apex-dental/client/src"
SKIP_FILES = {"constants.ts", "About.tsx"}  # About already done

# Map local constant names to COLORS keys
COLOR_MAP = {
    "TEAL": "COLORS.teal",
    "TEAL_DARK": "COLORS.tealDark",
    "TEAL_DEEP": "COLORS.tealDeep",
    "TEAL_MID": "COLORS.tealMid",
    "TEAL_PALE": "COLORS.tealPale",
    "TEAL_LIGHT": "COLORS.tealLight",
    "GOLD": "COLORS.gold",
}

# Patterns to remove local const definitions
CONST_DEF_PATTERN = re.compile(
    r'^const (TEAL(?:_DARK|_DEEP|_MID|_PALE|_LIGHT)?|GOLD|CREAM)\s*=\s*"oklch\([^"]+\)";\s*\n',
    re.MULTILINE
)

COLORS_IMPORT = 'import { COLORS } from "@/lib/constants";'

def process_file(filepath: str) -> tuple[bool, int]:
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Remove local color constant definitions
    content, n = CONST_DEF_PATTERN.subn('', original)
    if n == 0:
        return False, 0

    # Add COLORS import if not already present
    if 'COLORS' in content and 'from "@/lib/constants"' not in content:
        # Check if PRACTICE import already exists — if so, extend it
        if 'import { PRACTICE }' in content:
            content = content.replace(
                'import { PRACTICE } from "@/lib/constants";',
                'import { PRACTICE, COLORS } from "@/lib/constants";'
            )
        elif 'import {' in content and 'from "@/lib/constants"' in content:
            # Some other named import from constants — extend it
            content = re.sub(
                r'import \{([^}]+)\} from "@/lib/constants";',
                lambda m: f'import {{{m.group(1)}, COLORS}} from "@/lib/constants";',
                content
            )
        else:
            # Find last import line and insert after
            lines = content.split('\n')
            last_import_idx = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import_idx = i
            lines.insert(last_import_idx + 1, COLORS_IMPORT)
            content = '\n'.join(lines)

    # Now replace usage of local constants with COLORS.xxx
    for name, replacement in COLOR_MAP.items():
        # Replace in template literals: ${TEAL} -> ${COLORS.teal}
        content = content.replace(f'${{{name}}}', f'${{{replacement}}}')
        # Replace as JSX expression value: {TEAL} -> {COLORS.teal}
        content = re.sub(rf'\b{name}\b', replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True, n

total_files = 0
total_changes = 0
for root, dirs, files in os.walk(SRC_DIR):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for fname in files:
        if not fname.endswith(('.tsx', '.ts')):
            continue
        if fname in SKIP_FILES:
            continue
        fpath = os.path.join(root, fname)
        modified, n = process_file(fpath)
        if modified:
            total_files += 1
            total_changes += n
            print(f"  ✓ {fpath.replace(SRC_DIR + '/', '')} ({n} color constants removed)")

print(f"\nDone: {total_changes} color constant definitions removed across {total_files} files.")
