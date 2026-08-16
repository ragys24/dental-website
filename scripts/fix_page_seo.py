"""
Fix all page titles (max 60 chars) and descriptions (max 160 chars)
across all service pages, city pages, and utility pages.
"""
import os
import re

PAGES_DIR = "/home/ubuntu/apex-dental/client/src/pages"

# Optimized titles and descriptions for each page (max 60 / max 160)
SEO_DATA = {
    "About.tsx": {
        "title": "About Us | Uplift Dental Garden Grove, CA",
        "desc": "Meet our 5 specialists at Uplift Dental in Garden Grove, CA. Over 40 years combined experience in general, cosmetic, and specialty dentistry."
    },
    "Accessibility.tsx": {
        "title": "Accessibility | Uplift Dental Garden Grove",
        "desc": "Uplift Dental is committed to digital accessibility for all patients. Learn about our ADA compliance and accessibility features."
    },
    "Blog.tsx": {
        "title": "Dental Health Blog | Uplift Dental",
        "desc": "Expert dental tips, oral health guides, and treatment insights from the specialists at Uplift Dental in Garden Grove, CA."
    },
    "Contact.tsx": {
        "title": "Contact Us | Uplift Dental Garden Grove, CA",
        "desc": "Contact Uplift Dental at (714) 898-3308. Located at 5253 Lampson Ave, Garden Grove, CA 92845. Same-day emergency appointments available."
    },
    "DentalBonding.tsx": {
        "title": "Dental Bonding | Uplift Dental Garden Grove",
        "desc": "Affordable dental bonding in Garden Grove, CA. Repair chips, gaps, and discoloration in one visit. Free consultation at Uplift Dental."
    },
    "DentalCrowns.tsx": {
        "title": "Dental Crowns | Uplift Dental Garden Grove",
        "desc": "Same-day dental crowns in Garden Grove, CA. Porcelain, zirconia, and CEREC crowns. Restore damaged teeth at Uplift Dental."
    },
    "DentalFillings.tsx": {
        "title": "Tooth-Colored Fillings | Uplift Dental",
        "desc": "Mercury-free composite fillings in Garden Grove, CA. Natural-looking cavity repair for the whole family at Uplift Dental."
    },
    "DentalImplants.tsx": {
        "title": "Dental Implants | Uplift Dental Garden Grove",
        "desc": "3D-guided dental implants in Garden Grove, CA. Permanent tooth replacement with SprintRay technology. Free implant consultation."
    },
    "EmergencyDentist.tsx": {
        "title": "Emergency Dentist | Uplift Dental Garden Grove",
        "desc": "Same-day emergency dental care in Garden Grove, CA. Toothaches, broken teeth, and trauma. Call (714) 898-3308 for immediate help."
    },
    "Endodontics.tsx": {
        "title": "Root Canal Specialist | Uplift Dental",
        "desc": "Expert endodontics by Dr. Ghobrial in Garden Grove, CA. Microscopic root canals, retreatments, and apicoectomy. Pain-free care."
    },
    "Gallery.tsx": {
        "title": "Smile Gallery | Uplift Dental Garden Grove",
        "desc": "See real smile transformations at Uplift Dental. Before and after photos of veneers, implants, Invisalign, and whitening results."
    },
    "InsuranceFinancing.tsx": {
        "title": "Insurance & Financing | Uplift Dental",
        "desc": "Denti-Cal, PPO, and military insurance accepted. Cherry financing and in-house membership plans at Uplift Dental Garden Grove."
    },
    "Invisalign.tsx": {
        "title": "Invisalign Provider | Uplift Dental",
        "desc": "Platinum Invisalign provider in Garden Grove, CA. Clear aligners with iTero scanning. Free Invisalign consultation at Uplift Dental."
    },
    "MembershipPlan.tsx": {
        "title": "Membership Plans | Uplift Dental",
        "desc": "Save on dental care with Uplift Dental membership plans starting at $29.99/mo. No insurance needed. Cleanings, exams, and discounts."
    },
    "Orthodontics.tsx": {
        "title": "Braces & Orthodontics | Uplift Dental",
        "desc": "Braces and clear aligners by Dr. Schneekluth in Garden Grove, CA. Over 40 years of orthodontic experience. Free consultation."
    },
    "Periodontics.tsx": {
        "title": "Periodontist | Uplift Dental Garden Grove",
        "desc": "Gum disease treatment by Dr. Saad in Garden Grove, CA. LANAP laser therapy, gum grafts, and scaling. Board-certified periodontist."
    },
    "PrivacyPolicy.tsx": {
        "title": "Privacy Policy | Uplift Dental",
        "desc": "Read the privacy policy for Uplift Dental & Orthodontics in Garden Grove, CA. How we collect, use, and protect your information."
    },
    "Services.tsx": {
        "title": "Dental Services | Uplift Dental Garden Grove",
        "desc": "Full-service dentistry in Garden Grove, CA. General, cosmetic, orthodontics, implants, periodontics, and emergency dental care."
    },
    "SmileAssessment.tsx": {
        "title": "Free Smile Assessment | Uplift Dental",
        "desc": "Take our free smile assessment to discover your ideal treatment. Personalized recommendations from Uplift Dental specialists."
    },
    "SpecialOffers.tsx": {
        "title": "Special Offers | Uplift Dental Garden Grove",
        "desc": "Current dental specials at Uplift Dental. Free consultations, new patient discounts, and seasonal promotions in Garden Grove, CA."
    },
    "TeethCleaning.tsx": {
        "title": "Teeth Cleaning | Uplift Dental Garden Grove",
        "desc": "Professional teeth cleaning in Garden Grove, CA. Preventive exams, deep cleaning, and periodontal maintenance at Uplift Dental."
    },
    "TeethWhitening.tsx": {
        "title": "Teeth Whitening | Uplift Dental Garden Grove",
        "desc": "Professional teeth whitening in Garden Grove, CA. In-office and take-home options for a brighter smile at Uplift Dental."
    },
    "TermsOfService.tsx": {
        "title": "Terms of Service | Uplift Dental",
        "desc": "Terms of service for Uplift Dental & Orthodontics website. Usage policies, disclaimers, and legal information."
    },
    "Veneers.tsx": {
        "title": "Porcelain Veneers | Uplift Dental",
        "desc": "Custom porcelain veneers in Garden Grove, CA. Transform your smile with natural-looking veneers at Uplift Dental. Free consultation."
    },
    "WisdomTeeth.tsx": {
        "title": "Wisdom Teeth Removal | Uplift Dental",
        "desc": "Safe wisdom teeth extraction by Dr. Youssef in Garden Grove, CA. Oral surgery specialist with sedation options at Uplift Dental."
    },
}

fixed_count = 0
for filename, seo in SEO_DATA.items():
    filepath = os.path.join(PAGES_DIR, filename)
    if not os.path.exists(filepath):
        print(f"⚠️ File not found: {filename}")
        continue
    
    with open(filepath, "r") as f:
        content = f.read()
    
    original = content
    new_title = seo["title"]
    new_desc = seo["desc"]
    
    # Replace title in PageSEO
    content = re.sub(
        r'(title=")[^"]*(")',
        lambda m: f'{m.group(1)}{new_title}{m.group(2)}',
        content,
        count=1
    )
    
    # Replace description in PageSEO
    content = re.sub(
        r'(description=")[^"]*(")',
        lambda m: f'{m.group(1)}{new_desc}{m.group(2)}',
        content,
        count=1
    )
    
    if content != original:
        with open(filepath, "w") as f:
            f.write(content)
        print(f"✅ Fixed {filename}: title={len(new_title)} chars, desc={len(new_desc)} chars")
        fixed_count += 1
    else:
        print(f"⏭️ No changes needed: {filename}")

print(f"\n{'=' * 40}")
print(f"Fixed {fixed_count} files")
