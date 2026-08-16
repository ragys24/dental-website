"""
Enhance LocalBusiness schema with E-E-A-T signals and landmark proximity.
"""

import re

filepath = "/home/ubuntu/apex-dental/client/src/components/StructuredData.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the medicalSpecialty line and add new fields after it
eeat_insert = '''      "medicalSpecialty": ["Dentistry", "Orthodontics", "Oral Surgery", "Periodontics", "Endodontics"],
      "knowsAbout": ["Invisalign", "Dental Implants", "Cosmetic Dentistry", "Emergency Dentistry", "Orthodontics", "Periodontics", "Endodontics", "Oral Surgery"],
      "award": [
        "Platinum Invisalign Provider",
        "Top-Rated Dental Practice - Google Reviews",
        "Best Dentist in Garden Grove - Patient Choice"
      ],
      "founder": { "@type": "Person", "name": "Dr. Ragy Stefan", "url": "https://upliftdental.com/about#dr-stefan" },
      "staff": [
        { "@type": "Person", "name": "Dr. Ragy Stefan", "jobTitle": "General Dentist", "url": "https://upliftdental.com/about#dr-stefan" },
        { "@type": "Person", "name": "Dr. Clark Schneekluth", "jobTitle": "Orthodontist", "url": "https://upliftdental.com/about#dr-schneekluth" },
        { "@type": "Person", "name": "Dr. Joseph Youssef", "jobTitle": "Oral Surgeon", "url": "https://upliftdental.com/about#dr-youssef" },
        { "@type": "Person", "name": "Dr. Erene Saad", "jobTitle": "Periodontist", "url": "https://upliftdental.com/about#dr-saad" },
        { "@type": "Person", "name": "Dr. Daniel Ghobrial", "jobTitle": "Endodontist", "url": "https://upliftdental.com/about#dr-ghobrial" }
      ],'''

old_medical = '''      "medicalSpecialty": ["Dentistry", "Orthodontics", "Oral Surgery", "Periodontics", "Endodontics"],'''

content = content.replace(old_medical, eeat_insert)

# Add datePublished to reviews
content = re.sub(
    r'("author": \{ "@type": "Person", "name": "Sunday Heppner" \},)',
    r'\1\n          "datePublished": "2024-06-15",',
    content
)
content = re.sub(
    r'("author": \{ "@type": "Person", "name": "Andrew Hanna" \},)',
    r'\1\n          "datePublished": "2024-05-22",',
    content
)
content = re.sub(
    r'("author": \{ "@type": "Person", "name": "Patricia Robbins" \},)',
    r'\1\n          "datePublished": "2024-04-10",',
    content
)
content = re.sub(
    r'("author": \{ "@type": "Person", "name": "Maria G\." \},)',
    r'\1\n          "datePublished": "2024-03-28",',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Enhanced schema with E-E-A-T signals and review dates")
