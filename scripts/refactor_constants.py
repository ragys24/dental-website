#!/usr/bin/env python3
"""
Bulk-replace hardcoded practice info with PRACTICE/SMS constants across all page/component files.
Adds the necessary imports if not already present.
"""
import os
import re
import sys

SRC_DIR = "/home/ubuntu/apex-dental/client/src"

# Files to skip (already updated or are the source of truth)
SKIP_FILES = {
    "constants.ts",
    "sms.ts",
    "StructuredData.tsx",
    "Navbar.tsx",
    "Footer.tsx",
    "MobileCallBar.tsx",
    "About.tsx",
}

# Replacements to apply (order matters — more specific first)
REPLACEMENTS = [
    # tel: href attributes
    (r'href="tel:\+17148983308"', 'href={PRACTICE.phone.tel}'),
    (r"href='tel:\+17148983308'", 'href={PRACTICE.phone.tel}'),
    (r'href=\{`tel:\+17148983308`\}', 'href={PRACTICE.phone.tel}'),
    # SMS href with encodeURIComponent
    (r'href=\{`sms:\+18888955908&body=\$\{encodeURIComponent\([^)]+\)\}`\}', 'href={SMS.general}'),
    (r'href=\{`sms:\+18888955908[^`]*`\}', 'href={SMS.general}'),
    (r'href="sms:\+18888955908[^"]*"', 'href={SMS.general}'),
    # Display strings in JSX text nodes and string literals
    (r'\(714\) 898-3308', '{PRACTICE.phone.display}'),
    (r'\(888\) 895-5908', '{PRACTICE.sms.display}'),
    # Address
    (r'5253 Lampson Ave,?\s*Garden Grove,?\s*CA\s*92845', '{PRACTICE.address.full}'),
    (r'5253 Lampson Ave', '{PRACTICE.address.street}'),
    (r'Garden Grove,\s*CA\s*92845', '{PRACTICE.address.city}, {PRACTICE.address.state} {PRACTICE.address.zip}'),
]

# Import lines to inject if needed
PRACTICE_IMPORT = 'import { PRACTICE } from "@/lib/constants";'
SMS_IMPORT = 'import { SMS } from "@/lib/sms";'

def needs_practice_import(content: str) -> bool:
    return 'PRACTICE' in content and 'from "@/lib/constants"' not in content

def needs_sms_import(content: str) -> bool:
    return 'SMS.general' in content and 'from "@/lib/sms"' not in content

def inject_imports(content: str, add_practice: bool, add_sms: bool) -> str:
    if not add_practice and not add_sms:
        return content
    lines = content.split('\n')
    # Find last import line
    last_import_idx = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
    insert_after = last_import_idx
    new_imports = []
    if add_practice:
        new_imports.append(PRACTICE_IMPORT)
    if add_sms:
        new_imports.append(SMS_IMPORT)
    lines = lines[:insert_after + 1] + new_imports + lines[insert_after + 1:]
    return '\n'.join(lines)

def process_file(filepath: str) -> tuple[bool, int]:
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()
    content = original
    changes = 0
    for pattern, replacement in REPLACEMENTS:
        new_content, n = re.subn(pattern, replacement, content)
        if n > 0:
            changes += n
            content = new_content
    if changes > 0:
        add_practice = needs_practice_import(content)
        add_sms = needs_sms_import(content)
        content = inject_imports(content, add_practice, add_sms)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    return False, 0

total_files = 0
total_changes = 0
for root, dirs, files in os.walk(SRC_DIR):
    # Skip node_modules
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
            print(f"  ✓ {fpath.replace(SRC_DIR + '/', '')} ({n} replacements)")

print(f"\nDone: {total_changes} replacements across {total_files} files.")
