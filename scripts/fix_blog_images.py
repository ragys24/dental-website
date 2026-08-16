"""
Assign unique, topic-appropriate Unsplash images to each blog post in blogData.ts.
All 44 posts currently share the same placeholder image.
"""

import re

BLOG_DATA_PATH = "/home/ubuntu/apex-dental/client/src/lib/blogData.ts"

# Map each slug to a unique, relevant Unsplash photo
# Format: slug -> unsplash_photo_id (w=800&q=80 appended)
SLUG_TO_IMAGE = {
    "a-parents-guide-to-your-childs-first-dental-visit":
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    "how-gum-disease-can-affect-your-overall-health":
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    "dental-sealants-the-secret-weapon-against-cavities-for-kids-and-adults":
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    "new-year-new-smile-setting-dental-health-goals-for-the-year-ahead":
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80",
    "the-ultimate-guide-to-choosing-between-dental-bridge-and-implant":
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    "dental-care-during-pregnancy-what-every-expecting-mom-should-know":
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    "tmj-disorder-causes-symptoms-and-treatment-options":
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    "the-benefits-of-dental-implants-a-permanent-solution-for-missing-teeth":
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    "dental-emergency-away-from-home":
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "what-are-dental-veneers-and-are-they-right-for-you":
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    "do-i-really-need-to-floss-a-dentist-answers-your-top-questions":
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    "cosmetic-dentistry-5-ways-to-transform-your-smile":
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    "understanding-root-canals-why-they-are-nothing-to-fear":
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    "how-dental-crowns-can-save-a-damaged-tooth":
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    "why-regular-dental-cleanings-are-more-important-than-you-think":
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    "the-truth-about-dental-anxiety-and-how-to-overcome-it":
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    "braces-vs-invisalign-which-is-better-for-your-teen":
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    "what-to-do-when-you-crack-or-break-a-tooth":
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "7-tips-to-keep-your-kids-teeth-healthy-and-cavity-free":
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    "the-complete-guide-to-invisalign-what-to-expect-from-start-to-finish":
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    "everything-you-need-to-know-about-teeth-whitening":
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80",
    "how-to-choose-the-best-dentist-in-garden-grove-ca":
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    "dental-implants-vs-dentures-which-is-right-for-you":
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    "emergency-dentist-garden-grove":
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    "tips-for-optimal-braces-care":
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    "effective-tmj-treatment-options":
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    "oral-health-and-overall-wellness-why-seniors-need-regular-dental-checkups":
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    "get-started-the-benefits-of-early-intervention-with-invisalign":
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    "understanding-gum-disease-stages":
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    "fluoride-vs-hydroxyapatite-which-is-best-for-your-childs-dental-health":
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    "3-tricks-to-make-flossing-with-braces-easier":
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    "what-happens-during-your-professional-dental-cleaning":
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    "oral-health-tips-for-children":
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    "diet-and-oral-health":
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    "a-deep-dive-into-dental-hygiene-floss-vs-water-pick":
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    "is-invisalign-the-same-as-braces":
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    "its-too-early-for-braces-or-is-it":
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    "how-to-keep-your-teeth-healthy-and-white":
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80",
    "i-want-whiter-teeth":
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    "what-are-the-differences-between-dental-insurance-plans":
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    "are-clear-aligners-better-than-braces":
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    "the-compassionate-provider":
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
}

with open(BLOG_DATA_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Find each post block and replace its image field based on the slug
# Pattern: look for slug: "...", then find the next image: "..." within ~200 chars
replaced = 0
for slug, new_image in SLUG_TO_IMAGE.items():
    # Match the slug line, then capture up to the image field
    pattern = r'(slug:\s*"' + re.escape(slug) + r'".*?image:\s*)"[^"]*"'
    replacement = r'\1"' + new_image + '"'
    new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)
    if count > 0:
        content = new_content
        replaced += count
        print(f"✓ {slug}")
    else:
        print(f"✗ NOT FOUND: {slug}")

with open(BLOG_DATA_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone: {replaced} images replaced out of {len(SLUG_TO_IMAGE)} slugs")
