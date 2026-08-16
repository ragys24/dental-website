#!/usr/bin/env python3
"""Reassign blog post categories based on the reorganization plan."""

import re

# Read the file
with open('client/src/lib/blogData.ts', 'r') as f:
    content = f.read()

# Category mapping: slug -> new category
category_map = {
    # Preventive Care
    "a-parents-guide-to-your-childs-first-dental-visit": "Preventive Care",
    "dental-sealants-the-secret-weapon-against-cavities-for-kids-and-adults": "Preventive Care",
    "do-i-really-need-to-floss-a-dentist-answers-your-top-questions": "Preventive Care",
    "why-regular-dental-cleanings-are-more-important-than-you-think": "Preventive Care",
    "7-tips-to-keep-your-kids-teeth-healthy-and-cavity-free": "Preventive Care",
    "a-deep-dive-into-dental-hygiene-floss-vs-water-pick": "Preventive Care",
    "fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health": "Preventive Care",
    "oral-health-tips-for-children": "Preventive Care",
    "diet-and-oral-health": "Preventive Care",
    "what-happens-during-your-professional-dental-cleaning": "Preventive Care",
    
    # Cosmetic Dentistry
    "what-are-dental-veneers-and-are-they-right-for-you": "Cosmetic Dentistry",
    "cosmetic-dentistry-5-ways-to-transform-your-smile": "Cosmetic Dentistry",
    "everything-you-need-to-know-about-teeth-whitening": "Cosmetic Dentistry",
    "how-to-keep-my-teeth-white-and-healthy": "Cosmetic Dentistry",
    "i-want-whiter-teeth": "Cosmetic Dentistry",
    
    # Orthodontics
    "braces-vs-invisalign-which-is-better-for-your-teen": "Orthodontics",
    "the-complete-guide-to-invisalign-what-to-expect-from-start-to-finish": "Orthodontics",
    "is-invisalign-the-same-as-braces": "Orthodontics",
    "when-should-i-get-braces-or-invisalign": "Orthodontics",
    "are-clear-aligners-better-than-braces": "Orthodontics",
    "tips-for-optimal-braces-care": "Orthodontics",
    "get-started-the-benefits-of-early-intervention-with-invisalign": "Orthodontics",
    "3-tricks-to-make-flossing-with-braces-easier": "Orthodontics",
    
    # Restorative Dentistry
    "the-ultimate-guide-to-choosing-between-dental-bridge-and-implant": "Restorative Dentistry",
    "the-benefits-of-dental-implants-a-permanent-solution-for-missing-teeth": "Restorative Dentistry",
    "understanding-root-canals-why-they-are-nothing-to-fear": "Restorative Dentistry",
    "how-dental-crowns-can-save-a-damaged-tooth": "Restorative Dentistry",
    "dental-implants-vs-dentures-which-is-right-for-you": "Restorative Dentistry",
    
    # Oral Health
    "how-gum-disease-can-affect-your-overall-health": "Oral Health",
    "tmj-disorder-causes-symptoms-and-treatment-options": "Oral Health",
    "effective-tmj-treatment-options": "Oral Health",
    "oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups": "Oral Health",
    "dental-care-during-pregnancy-what-every-expecting-mom-should-know": "Oral Health",
    "understanding-gum-disease-stages": "Oral Health",
    
    # Emergency Dental Care
    "what-to-do-when-you-crack-or-break-a-tooth": "Emergency Dental Care",
    "how-to-handle-a-dental-emergency-when-you-are-away-from-home": "Emergency Dental Care",
    "5-signs-you-need-to-see-an-emergency-dentist-right-away": "Emergency Dental Care",
    
    # Patient Resources
    "new-year-new-smile-setting-dental-health-goals-for-the-year-ahead": "Patient Resources",
    "the-truth-about-dental-anxiety-and-how-to-overcome-it": "Patient Resources",
    "how-to-choose-the-best-dentist-in-garden-grove-ca": "Patient Resources",
    "what-are-the-differences-between-dental-insurance-plans": "Patient Resources",
    "the-compassionate-provider": "Patient Resources",
}

# Apply replacements
changes = 0
for slug, new_category in category_map.items():
    # Find the pattern: slug followed by category within the same blog post object
    # We need to find the category line that follows the slug
    pattern = rf'(slug: "{slug}".*?category: )"([^"]+)"'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_category = match.group(2)
        if old_category != new_category:
            # Replace just the category value for this specific post
            content = content[:match.start(2)] + new_category + content[match.end(2):]
            changes += 1
            print(f"  {slug}: {old_category} -> {new_category}")
    else:
        print(f"  WARNING: Could not find slug '{slug}'")

print(f"\nTotal changes: {changes}")

# Write back
with open('client/src/lib/blogData.ts', 'w') as f:
    f.write(content)

# Verify the new distribution
titles = re.findall(r'title: "([^"]+)"', content)
categories = re.findall(r'category: "([^"]+)"', content)
from collections import Counter
counts = Counter(categories)
print("\nNew category distribution:")
for cat, count in sorted(counts.items()):
    print(f"  {cat}: {count} posts")
print(f"  Total: {sum(counts.values())} posts")
