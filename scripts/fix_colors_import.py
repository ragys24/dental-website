#!/usr/bin/env python3
"""
Fix files where COLORS is used but not imported.
Extends existing 'import { PRACTICE } from "@/lib/constants"' to include COLORS.
"""
import os
import re

SRC_DIR = "/home/ubuntu/apex-dental/client/src"

AFFECTED = [
    "components/LiveChat.tsx",
    "pages/Accessibility.tsx",
    "pages/Blog.tsx",
    "pages/BlogPost.tsx",
    "pages/Contact.tsx",
    "pages/DentalBonding.tsx",
    "pages/DentalCrowns.tsx",
    "pages/DentalFillings.tsx",
    "pages/Endodontics.tsx",
    "pages/Gallery.tsx",
    "pages/InsuranceFinancing.tsx",
    "pages/LocalAreaPage.tsx",
    "pages/Orthodontics.tsx",
    "pages/Periodontics.tsx",
    "pages/PrivacyPolicy.tsx",
    "pages/Services.tsx",
    "pages/SmileAssessment.tsx",
    "pages/TeethCleaning.tsx",
    "pages/TeethWhitening.tsx",
    "pages/TermsOfService.tsx",
    "pages/Veneers.tsx",
    "pages/WisdomTeeth.tsx",
]

for rel in AFFECTED:
    fpath = os.path.join(SRC_DIR, rel)
    with open(fpath, 'r') as f:
        content = f.read()

    if 'COLORS' not in content:
        print(f"  skip {rel} (no COLORS usage)")
        continue

    # Try to extend existing constants import
    if 'import { PRACTICE }' in content and 'COLORS' not in content.split('import { PRACTICE }')[0] + 'import { PRACTICE }':
        new_content = content.replace(
            'import { PRACTICE } from "@/lib/constants";',
            'import { PRACTICE, COLORS } from "@/lib/constants";'
        )
    elif re.search(r'import \{[^}]+\} from "@/lib/constants"', content):
        # Extend whatever named import exists
        new_content = re.sub(
            r'import \{([^}]+)\} from "@/lib/constants";',
            lambda m: f'import {{{m.group(1).rstrip()}, COLORS}} from "@/lib/constants";',
            content
        )
    else:
        # Add a new import line after the last import
        lines = content.split('\n')
        last_import_idx = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        lines.insert(last_import_idx + 1, 'import { COLORS } from "@/lib/constants";')
        new_content = '\n'.join(lines)

    if new_content != content:
        with open(fpath, 'w') as f:
            f.write(new_content)
        print(f"  ✓ {rel}")
    else:
        print(f"  ! {rel} — no change made (check manually)")

print("\nDone.")
