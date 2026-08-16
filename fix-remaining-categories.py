#!/usr/bin/env python3
"""Fix the 4 remaining posts that had wrong slug guesses."""
import re

with open('client/src/lib/blogData.ts', 'r') as f:
    content = f.read()

fixes = {
    "how-to-keep-your-teeth-healthy-and-white": "Cosmetic Dentistry",
    "its-too-early-for-braces-or-is-it": "Orthodontics",
    "dental-emergency-away-from-home": "Emergency Dental Care",
    "emergency-dentist-garden-grove": "Emergency Dental Care",
}

changes = 0
for slug, new_category in fixes.items():
    pattern = rf'(slug: "{slug}".*?category: )"([^"]+)"'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_category = match.group(2)
        if old_category != new_category:
            content = content[:match.start(2)] + new_category + content[match.end(2):]
            changes += 1
            print(f"  {slug}: {old_category} -> {new_category}")
        else:
            print(f"  {slug}: already {new_category}")
    else:
        print(f"  WARNING: Could not find slug '{slug}'")

print(f"\nTotal changes: {changes}")

with open('client/src/lib/blogData.ts', 'w') as f:
    f.write(content)

# Final distribution
categories = re.findall(r'category: "([^"]+)"', content)
from collections import Counter
counts = Counter(categories)
print("\nFinal category distribution:")
for cat, count in sorted(counts.items()):
    print(f"  {cat}: {count} posts")
print(f"  Total: {sum(counts.values())} posts")
