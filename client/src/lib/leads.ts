const WEB3FORMS_ACCESS_KEY = "84b33306-8bd2-4e29-bbbc-0da57a4292dc";

export type LeadSubmission = {
  name: string;
  phone: string;
  service?: string;
  message?: string;
  source: "homepage" | "contact-page" | "chat";
};

export async function submitLead(lead: LeadSubmission): Promise<void> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Appointment Request — Uplift Dental (${lead.source})`,
      from_name: lead.name,
      name: lead.name,
      phone: lead.phone,
      service: lead.service || "Not specified",
      message: lead.message || "Not provided",
      source: lead.source,
      time: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
    }),
  });

  const result = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Lead submission failed");
  }
}
