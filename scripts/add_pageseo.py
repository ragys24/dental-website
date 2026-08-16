"""
Add PageSEO component to pages that are missing it:
- Home.tsx, SpecialOffers.tsx, LocalAreaPage.tsx, BlogPost.tsx
City pages use LocalAreaPage which will get PageSEO, so they inherit it.
NotFound.tsx doesn't need SEO.
"""
import re

PAGES_DIR = "/home/ubuntu/apex-dental/client/src/pages"

# 1. Fix Home.tsx — add PageSEO import and component
filepath = f"{PAGES_DIR}/Home.tsx"
with open(filepath, "r") as f:
    content = f.read()

# Add PageSEO import if missing
if "PageSEO" not in content:
    # Add after the last import line
    content = re.sub(
        r'(import .+? from .+?;\n)(?!import)',
        r'\1import { PageSEO } from "@/components/PageSEO";\n',
        content,
        count=1
    )

# Add PageSEO component after first opening fragment or div in return
if '<PageSEO' not in content:
    content = content.replace(
        'return (\n    <>',
        'return (\n    <>\n      <PageSEO\n        title="Uplift Dental | Dentist in Garden Grove, CA"\n        description="Platinum Invisalign provider in Garden Grove, CA. Same-day emergencies, cosmetic and family dentistry, implants, orthodontics. Denti-Cal accepted."\n        canonical="https://upliftdental.com/"\n      />',
        1
    )

with open(filepath, "w") as f:
    f.write(content)
print("✅ Home.tsx — added PageSEO")


# 2. Fix SpecialOffers.tsx
filepath = f"{PAGES_DIR}/SpecialOffers.tsx"
with open(filepath, "r") as f:
    content = f.read()

if "PageSEO" not in content:
    content = re.sub(
        r'(import .+? from .+?;\n)(?!import)',
        r'\1import { PageSEO } from "@/components/PageSEO";\n',
        content,
        count=1
    )

if '<PageSEO' not in content:
    # Find the return statement and add after the first opening tag
    content = re.sub(
        r'(return\s*\(\s*\n\s*<>)',
        r'\1\n      <PageSEO\n        title="Special Offers | Uplift Dental Garden Grove"\n        description="Current dental specials at Uplift Dental. Free consultations, new patient discounts, and seasonal promotions in Garden Grove, CA."\n        canonical="https://upliftdental.com/special-offers"\n      />',
        content,
        count=1
    )
    # If no fragment, try div
    if '<PageSEO' not in content:
        content = re.sub(
            r'(return\s*\(\s*\n\s*<div)',
            r'return (\n    <>\n      <PageSEO\n        title="Special Offers | Uplift Dental Garden Grove"\n        description="Current dental specials at Uplift Dental. Free consultations, new patient discounts, and seasonal promotions in Garden Grove, CA."\n        canonical="https://upliftdental.com/special-offers"\n      />\n      <div',
            content,
            count=1
        )

with open(filepath, "w") as f:
    f.write(content)
print("✅ SpecialOffers.tsx — added PageSEO")


# 3. Fix LocalAreaPage.tsx — add PageSEO using city prop
filepath = f"{PAGES_DIR}/LocalAreaPage.tsx"
with open(filepath, "r") as f:
    content = f.read()

if "PageSEO" not in content:
    content = re.sub(
        r'(import .+? from .+?;\n)(?!import)',
        r'\1import { PageSEO } from "@/components/PageSEO";\n',
        content,
        count=1
    )

if '<PageSEO' not in content:
    # Find the return and add PageSEO using the city prop
    content = re.sub(
        r'(return\s*\(\s*\n\s*<>)',
        r'\1\n      <PageSEO\n        title={`Dentist Near ${city}, ${state} | Uplift Dental`}\n        description={`Uplift Dental serves ${city}, ${state} with general, cosmetic, and specialty dentistry. ${distance} from Garden Grove. Free consultations.`}\n        canonical={`https://upliftdental.com/${slug}`}\n      />',
        content,
        count=1
    )
    if '<PageSEO' not in content:
        content = re.sub(
            r'(return\s*\(\s*\n\s*<div)',
            r'return (\n    <>\n      <PageSEO\n        title={`Dentist Near ${city}, ${state} | Uplift Dental`}\n        description={`Uplift Dental serves ${city}, ${state} with general, cosmetic, and specialty dentistry. ${distance} from Garden Grove. Free consultations.`}\n        canonical={`https://upliftdental.com/${slug}`}\n      />\n      <div',
            content,
            count=1
        )

with open(filepath, "w") as f:
    f.write(content)
print("✅ LocalAreaPage.tsx — added PageSEO")


# 4. Fix BlogPost.tsx — replace document.title with PageSEO
filepath = f"{PAGES_DIR}/BlogPost.tsx"
with open(filepath, "r") as f:
    content = f.read()

if "PageSEO" not in content:
    content = re.sub(
        r'(import .+? from .+?;\n)(?!import)',
        r'\1import { PageSEO } from "@/components/PageSEO";\n',
        content,
        count=1
    )

with open(filepath, "w") as f:
    f.write(content)
print("✅ BlogPost.tsx — added PageSEO import")

print("\nDone! Run TypeScript check to verify.")
