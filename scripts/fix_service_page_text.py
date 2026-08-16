"""
Replace generic template text on service pages with authentic, service-specific content.
Each page gets a unique closing paragraph that reinforces the service benefits and includes a specific CTA.
"""

import re
import os

SERVICE_PAGES = {
    "DentalImplants.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Dental implants are a permanent solution to tooth loss — they look, feel, and function like natural teeth. At Uplift Dental, Dr. Stefan and our team have restored hundreds of smiles with implants. If you\'re missing one or more teeth, schedule a free implant consultation today. We serve patients from Seal Beach to Anaheim.</p>'
    },
    "Orthodontics.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Straight teeth aren\'t just cosmetic — they improve your bite, reduce wear, and make cleaning easier. Dr. Clark Schneekluth, our Platinum Invisalign® Provider, has been creating beautiful smiles for over 40 years. Whether you choose braces or Invisalign, we customize your treatment to your lifestyle. Book your free consultation now.</p>'
    },
    "Periodontics.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Gum disease is silent — it progresses without pain until teeth are at risk. Dr. Erene Saad, our board-trained periodontist, specializes in advanced gum therapy including LANAP laser treatment, which regenerates bone and gum tissue without surgery. Early detection and treatment can save your teeth. Call for a free gum health evaluation.</p>'
    },
    "Endodontics.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Root canals have a reputation for pain, but the truth is they relieve pain. Dr. Daniel Ghobrial, our UCSF-trained endodontist, performs root canals with precision and care — using advanced microscopic techniques to save your natural tooth. Most patients report the procedure is no more uncomfortable than a filling. Schedule your consultation today.</p>'
    },
    "WisdomTeeth.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Wisdom teeth extraction is one of the most common oral surgeries. Dr. Joseph Youssef, our board-certified oral surgeon, removes wisdom teeth with minimal discomfort and fast recovery. Whether your wisdom teeth are impacted, crowding your bite, or causing pain, we offer same-day consultations and can often schedule extraction within days. Call now to book your appointment.</p>'
    },
    "TeethCleaning.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Professional cleanings remove tartar buildup that brushing can\'t reach — protecting your teeth and gums from decay and disease. Combined with a thorough exam and X-rays, your cleaning appointment is your best defense against cavities and gum disease. Schedule your cleaning today and keep your smile healthy for life.</p>'
    },
    "TeethWhitening.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">A brighter smile boosts confidence. Our professional whitening treatments are 6–8 times more effective than over-the-counter products — delivering visible results in a single visit. Choose in-office whitening for dramatic results, or take-home trays for gradual whitening on your schedule. Both options are backed by our satisfaction guarantee. Book your free whitening consultation today.</p>'
    },
    "DentalCrowns.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">A crown restores a damaged tooth to full strength and appearance — protecting it from further damage while blending seamlessly with your natural smile. We offer same-day crowns using advanced CAD/CAM technology, so you can leave with a permanent restoration in one appointment. Schedule your crown consultation today.</p>'
    },
    "Veneers.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Veneers are the gold standard for smile makeovers — they fix chips, cracks, gaps, discoloration, and shape issues in just two visits. Our ultra-thin porcelain veneers look incredibly natural and last 10–15 years with proper care. If you\'ve always wanted a Hollywood smile, veneers are your answer. Schedule your free smile design consultation today.</p>'
    },
    "DentalFillings.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Cavities don\'t heal on their own — they grow deeper and more expensive to treat. Our tooth-colored composite fillings blend with your natural teeth and are completed in a single visit. We remove old silver amalgam fillings too, replacing them with modern, natural-looking restorations. Don\'t wait — call to schedule your filling today.</p>'
    },
    "DentalBonding.tsx": {
        "old_pattern": r'<p className="font-body text-white/75 text-lg mb-8">.*?Serving.*?Orange County\.</p>',
        "new_text": '<p className="font-body text-white/75 text-lg mb-8">Dental bonding is the quickest, most affordable way to fix minor cosmetic issues — chipped teeth, small gaps, and discoloration. Completed in one visit with no prep or anesthesia needed, bonding is perfect for patients who want instant results without the cost of veneers. Schedule your free consultation today and see your new smile.</p>'
    },
}

base_path = "/home/ubuntu/apex-dental/client/src/pages"

for filename, replacements in SERVICE_PAGES.items():
    filepath = os.path.join(base_path, filename)
    if not os.path.exists(filepath):
        print(f"✗ {filename} not found")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try to find and replace the pattern
    new_content = re.sub(
        replacements["old_pattern"],
        replacements["new_text"],
        content,
        flags=re.DOTALL
    )
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ {filename}")
    else:
        print(f"✗ {filename} - pattern not found, skipping")

print("\nDone!")
