/**
 * UPLIFT DENTAL — SMS Link Utility
 * Generates pre-filled SMS links for the (888) 895-5908 text number.
 *
 * Cross-platform format: sms:NUMBER&body=MESSAGE
 * - iOS requires `&body=` (not `?body=`)
 * - Android supports both, but `&body=` works universally
 */

const SMS_NUMBER = "+18888955908";

export function smsLink(message: string): string {
  return `sms:${SMS_NUMBER}&body=${encodeURIComponent(message)}`;
}

// Pre-defined messages for each context
export const SMS = {
  general:       smsLink("Hi, I'd like to schedule an appointment at Uplift Dental."),
  invisalign:    smsLink("Hi, I'd like to schedule a free Invisalign consultation at Uplift Dental."),
  implants:      smsLink("Hi, I'd like to learn more about dental implants at Uplift Dental."),
  periodontics:  smsLink("Hi, I'd like to schedule a periodontal consultation at Uplift Dental."),
  endodontics:   smsLink("Hi, I'd like to schedule a root canal consultation with Dr. Ghobrial at Uplift Dental."),
  emergency:     smsLink("Hi, I have a dental emergency and need to be seen today at Uplift Dental."),
  orthodontics:  smsLink("Hi, I'd like to schedule a free orthodontics/braces consultation at Uplift Dental."),
  whitening:     smsLink("Hi, I'd like to learn more about professional teeth whitening at Uplift Dental."),
  veneers:       smsLink("Hi, I'd like to schedule a veneer consultation at Uplift Dental."),
  crowns:        smsLink("Hi, I'd like to learn more about dental crowns at Uplift Dental."),
  bonding:       smsLink("Hi, I'd like to schedule a dental bonding consultation at Uplift Dental."),
  fillings:      smsLink("Hi, I'd like to schedule an appointment for dental fillings at Uplift Dental."),
  cleaning:      smsLink("Hi, I'd like to schedule a teeth cleaning appointment at Uplift Dental."),
  wisdomTeeth:   smsLink("Hi, I'd like to schedule a wisdom teeth removal consultation at Uplift Dental."),
  specialOffer:  smsLink("Hi, I'd like to claim a special offer at Uplift Dental."),
  gallery:       smsLink("Hi, I'd like to schedule a smile consultation at Uplift Dental."),
  smileQuiz:     smsLink("Hi, I just completed the Smile Assessment and I'd like to schedule a consultation at Uplift Dental."),
  city: (city: string) => smsLink(`Hi, I'm a patient from ${city} and I'd like to schedule an appointment at Uplift Dental.`),
};
