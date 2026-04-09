import LocalAreaPage from "../LocalAreaPage";
import { PRACTICE } from "@/lib/constants";
export default function GardenGrove() {
  return (
    <LocalAreaPage
      city="Garden Grove"
      state="CA"
      distance="0 miles"
      driveTime="Right here"
      slug="garden-grove"
      nearbyLandmark="Located at {PRACTICE.address.full}"
      intro="Uplift Dental & Orthodontics is Garden Grove's premier multi-specialty dental practice — offering general dentistry, Platinum Invisalign®, dental implants, orthodontics, oral surgery, and Denti-Cal acceptance all under one roof."
    />
  );
}
