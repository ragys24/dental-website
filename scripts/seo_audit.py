"""
Comprehensive SEO audit for upliftdental.com
Checks: title, description, keywords, headings, images, structured data, links, etc.
"""
import os
import re
import json
from collections import defaultdict

PROJECT = "/home/ubuntu/apex-dental/client"
PAGES_DIR = os.path.join(PROJECT, "src/pages")
COMPONENTS_DIR = os.path.join(PROJECT, "src/components")
INDEX_HTML = os.path.join(PROJECT, "index.html")

issues = []
warnings = []
passed = []

def check_index_html():
    """Check index.html for meta tags, title, keywords, structured data"""
    with open(INDEX_HTML, "r") as f:
        content = f.read()
    
    # Title
    title_match = re.search(r"<title>(.*?)</title>", content)
    if title_match:
        title = title_match.group(1).replace("&amp;", "&")
        title_len = len(title)
        if 30 <= title_len <= 60:
            passed.append(f"✅ Homepage title: {title_len} chars ({title})")
        else:
            issues.append(f"❌ Homepage title: {title_len} chars (should be 30-60) — '{title}'")
    else:
        issues.append("❌ No <title> tag found in index.html")
    
    # Description
    desc_match = re.search(r'name="description"\s+content="([^"]*)"', content)
    if desc_match:
        desc = desc_match.group(1).replace("&amp;", "&")
        desc_len = len(desc)
        if 50 <= desc_len <= 160:
            passed.append(f"✅ Homepage description: {desc_len} chars")
        else:
            issues.append(f"❌ Homepage description: {desc_len} chars (should be 50-160)")
    else:
        issues.append("❌ No meta description found in index.html")
    
    # Keywords
    kw_match = re.search(r'name="keywords"\s+content="([^"]*)"', content)
    if kw_match:
        keywords = [k.strip() for k in kw_match.group(1).split(",")]
        kw_count = len(keywords)
        if 3 <= kw_count <= 8:
            passed.append(f"✅ Homepage keywords: {kw_count} keywords")
        else:
            issues.append(f"❌ Homepage keywords: {kw_count} (should be 3-8)")
    else:
        warnings.append("⚠️ No meta keywords found (optional but recommended)")
    
    # Canonical
    if 'rel="canonical"' in content:
        passed.append("✅ Canonical URL present")
    else:
        issues.append("❌ No canonical URL in index.html")
    
    # Open Graph
    og_tags = ["og:title", "og:description", "og:image", "og:url", "og:type"]
    for tag in og_tags:
        if f'property="{tag}"' in content:
            passed.append(f"✅ {tag} present")
        else:
            issues.append(f"❌ Missing {tag}")
    
    # Twitter Card
    tw_tags = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]
    for tag in tw_tags:
        if f'name="{tag}"' in content:
            passed.append(f"✅ {tag} present")
        else:
            warnings.append(f"⚠️ Missing {tag}")
    
    # Viewport
    if 'name="viewport"' in content:
        passed.append("✅ Viewport meta tag present")
    else:
        issues.append("❌ Missing viewport meta tag")
    
    # Robots
    if 'name="robots"' in content:
        passed.append("✅ Robots meta tag present")
    else:
        warnings.append("⚠️ No robots meta tag")
    
    # Structured data (static)
    ld_json_count = content.count("application/ld+json")
    if ld_json_count > 0:
        passed.append(f"✅ {ld_json_count} static JSON-LD block(s) in index.html")
    
    # Check for duplicate schemas
    dentist_count = content.count('"Dentist"')
    localbiz_count = content.count('"LocalBusiness"')
    if dentist_count + localbiz_count > 1:
        issues.append(f"❌ Multiple Dentist/LocalBusiness schemas in index.html ({dentist_count} Dentist, {localbiz_count} LocalBusiness)")
    
    # Preconnect count
    preconnect_count = content.count('rel="preconnect"')
    if preconnect_count > 4:
        warnings.append(f"⚠️ {preconnect_count} preconnect hints (recommended: max 4)")
    else:
        passed.append(f"✅ {preconnect_count} preconnect hints (within limit)")
    
    # Google site verification
    if "google-site-verification" in content:
        passed.append("✅ Google site verification tag present")


def check_page_seo():
    """Check each page component for PageSEO usage, headings, images"""
    page_files = []
    for f in os.listdir(PAGES_DIR):
        if f.endswith(".tsx") and not f.startswith("_"):
            page_files.append(f)
    
    # Also check city pages
    cities_dir = os.path.join(PAGES_DIR, "cities")
    if os.path.exists(cities_dir):
        for f in os.listdir(cities_dir):
            if f.endswith(".tsx"):
                page_files.append(f"cities/{f}")
    
    pages_without_pageseo = []
    pages_with_long_titles = []
    pages_with_long_desc = []
    pages_without_h1 = []
    images_without_alt = []
    images_without_dimensions = []
    
    for page_file in sorted(page_files):
        filepath = os.path.join(PAGES_DIR, page_file)
        with open(filepath, "r") as f:
            content = f.read()
        
        page_name = page_file.replace(".tsx", "")
        
        # Check for PageSEO component
        if "PageSEO" not in content:
            pages_without_pageseo.append(page_name)
        else:
            # Check title length
            title_match = re.search(r'title="([^"]*)"', content)
            if title_match:
                title = title_match.group(1)
                if len(title) > 60:
                    pages_with_long_titles.append((page_name, len(title), title[:60] + "..."))
            
            # Check description length
            desc_match = re.search(r'description="([^"]*)"', content)
            if desc_match:
                desc = desc_match.group(1)
                if len(desc) > 160:
                    pages_with_long_desc.append((page_name, len(desc)))
        
        # Check for h1
        if "<h1" not in content and "h1" not in content.lower():
            pages_without_h1.append(page_name)
        
        # Check images
        img_matches = re.finditer(r'<img\b([^>]*)/?>', content)
        for img in img_matches:
            attrs = img.group(1)
            if 'alt=' not in attrs or 'alt=""' in attrs:
                images_without_alt.append((page_name, img.group(0)[:80]))
            if 'width=' not in attrs and 'height=' not in attrs:
                images_without_dimensions.append((page_name, img.group(0)[:80]))
    
    if pages_without_pageseo:
        warnings.append(f"⚠️ Pages without PageSEO component ({len(pages_without_pageseo)}): {', '.join(pages_without_pageseo)}")
    else:
        passed.append(f"✅ All {len(page_files)} pages have PageSEO component")
    
    if pages_with_long_titles:
        for name, length, title in pages_with_long_titles:
            issues.append(f"❌ {name}: title is {length} chars (max 60) — '{title}'")
    else:
        passed.append("✅ All page titles are within 60 chars")
    
    if pages_with_long_desc:
        for name, length in pages_with_long_desc:
            issues.append(f"❌ {name}: description is {length} chars (max 160)")
    else:
        passed.append("✅ All page descriptions are within 160 chars")
    
    if pages_without_h1:
        warnings.append(f"⚠️ Pages without <h1> ({len(pages_without_h1)}): {', '.join(pages_without_h1)}")
    
    if images_without_alt:
        issues.append(f"❌ {len(images_without_alt)} images missing alt text:")
        for name, img in images_without_alt[:5]:
            issues.append(f"   → {name}: {img}")
    else:
        passed.append("✅ All images have alt text")
    
    if images_without_dimensions:
        warnings.append(f"⚠️ {len(images_without_dimensions)} images missing width/height attributes")
    else:
        passed.append("✅ All images have width/height attributes")


def check_structured_data():
    """Check StructuredData.tsx for proper schema"""
    sd_path = os.path.join(COMPONENTS_DIR, "StructuredData.tsx")
    if not os.path.exists(sd_path):
        issues.append("❌ StructuredData.tsx not found")
        return
    
    with open(sd_path, "r") as f:
        content = f.read()
    
    # Check for aggregateRating
    if "aggregateRating" in content:
        passed.append("✅ aggregateRating present in StructuredData.tsx")
    else:
        issues.append("❌ No aggregateRating in StructuredData.tsx")
    
    # Check for review array
    if '"review"' in content or "'review'" in content:
        if "aggregateRating" in content:
            passed.append("✅ Reviews nested with aggregateRating")
        else:
            issues.append("❌ Reviews present WITHOUT aggregateRating")
    
    # Check for LocalBusiness or Dentist type
    if '"Dentist"' in content or '"LocalBusiness"' in content:
        passed.append("✅ Dentist/LocalBusiness schema present")
    
    # Check for WebSite schema
    if "WebSite" in content:
        passed.append("✅ WebSite schema present")
    
    # Check for FAQPage schema
    if "FAQPage" in content:
        passed.append("✅ FAQPage schema available")


def check_links_and_redirects():
    """Check App.tsx for redirect coverage"""
    app_path = os.path.join(PROJECT, "src/App.tsx")
    with open(app_path, "r") as f:
        content = f.read()
    
    redirect_count = content.count("<Redirect")
    route_count = content.count("<Route")
    
    passed.append(f"✅ {route_count} routes and {redirect_count} redirects configured")
    
    # Check for 404 catch-all
    if "NotFound" in content or "*" in content:
        passed.append("✅ 404 catch-all route present")
    else:
        issues.append("❌ No 404 catch-all route")


def check_accessibility():
    """Check for basic accessibility features"""
    with open(INDEX_HTML, "r") as f:
        content = f.read()
    
    if 'lang="en"' in content or 'lang="' in content:
        passed.append("✅ HTML lang attribute present")
    else:
        issues.append("❌ Missing HTML lang attribute")


def check_performance():
    """Check for performance-related SEO factors"""
    with open(INDEX_HTML, "r") as f:
        content = f.read()
    
    # Check for preload
    if 'rel="preload"' in content:
        passed.append("✅ Critical asset preloading configured")
    
    # Check for dns-prefetch
    if 'rel="dns-prefetch"' in content:
        passed.append("✅ DNS prefetch configured")
    
    # Check _redirects for cache headers
    redirects_path = os.path.join(PROJECT, "public/_redirects")
    if os.path.exists(redirects_path):
        with open(redirects_path, "r") as f:
            redirects = f.read()
        if "Cache-Control" in redirects or "cache" in redirects.lower():
            passed.append("✅ Cache headers configured in _redirects")
        else:
            warnings.append("⚠️ No cache headers in _redirects")
        
        if "/* /index.html 200" in redirects:
            passed.append("✅ SPA catch-all redirect present")
        else:
            issues.append("❌ Missing SPA catch-all redirect in _redirects")


def check_sitemap_robots():
    """Check for sitemap.xml and robots.txt"""
    public_dir = os.path.join(PROJECT, "public")
    
    if os.path.exists(os.path.join(public_dir, "sitemap.xml")):
        passed.append("✅ sitemap.xml present")
    else:
        warnings.append("⚠️ No sitemap.xml in public/")
    
    if os.path.exists(os.path.join(public_dir, "robots.txt")):
        passed.append("✅ robots.txt present")
    else:
        warnings.append("⚠️ No robots.txt in public/")


# Run all checks
print("=" * 60)
print("SEO AUDIT — upliftdental.com")
print("=" * 60)

check_index_html()
check_page_seo()
check_structured_data()
check_links_and_redirects()
check_accessibility()
check_performance()
check_sitemap_robots()

print(f"\n{'=' * 60}")
print(f"ISSUES ({len(issues)})")
print(f"{'=' * 60}")
for i in issues:
    print(i)

print(f"\n{'=' * 60}")
print(f"WARNINGS ({len(warnings)})")
print(f"{'=' * 60}")
for w in warnings:
    print(w)

print(f"\n{'=' * 60}")
print(f"PASSED ({len(passed)})")
print(f"{'=' * 60}")
for p in passed:
    print(p)

print(f"\n{'=' * 60}")
print(f"SUMMARY: {len(passed)} passed, {len(warnings)} warnings, {len(issues)} issues")
print(f"{'=' * 60}")
