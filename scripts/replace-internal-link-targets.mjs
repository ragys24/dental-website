import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "client", "src", "lib", "blogData.ts");
const replacements = {
  "/2023/10/27/whats-are-the-differences-between-dental-insurance-plans": "/blog/what-are-the-differences-between-dental-insurance-plans",
  "/dental-bridges": "/dental-implants",
  "/dental-cleaning": "/teeth-cleaning",
  "/dental-financing": "/insurance-financing",
  "/dental-x-rays": "/services",
  "/dentures": "/services",
  "/emergency-care": "/emergency-dentist",
  "/gum-disease-treatment": "/periodontics",
  "/invisalign-treatment-garden-grove-ca": "/invisalign",
  "/night-guards": "/services",
  "/orthodontic-treatments": "/orthodontics",
  "/pediatric-dentistry": "/services",
  "/porcelain-veneers": "/veneers",
  "/root-canal-treatment": "/endodontics",
  "/same-day-dental-appointments": "/emergency-dentist",
  "/sedation-dentistry": "/services",
  "/tmj-treatment": "/blog/tmj-disorder-causes-symptoms-and-treatment-options",
  "/tmj-treatment-garden-grove-ca": "/blog/tmj-disorder-causes-symptoms-and-treatment-options",
  "/what-to-expect-at-your-first-dental-appointment": "/contact",
};

const original = fs.readFileSync(target, "utf8");
let updated = original;
let changes = 0;
for (const [legacy, current] of Object.entries(replacements)) {
  const count = updated.split(legacy).length - 1;
  updated = updated.split(legacy).join(current);
  changes += count;
}
fs.writeFileSync(target, updated);
console.log(JSON.stringify({ changedReferences: changes }, null, 2));
