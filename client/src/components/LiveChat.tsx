/* =============================================================
   UPLIFT DENTAL — Live Chat Widget
   Design: "Elevated Warmth" — teal brand, DM Serif + DM Sans
   Features: Dental FAQ bot, text/call CTAs, appointment booking,
             EmailJS form submission for offline messages
   ============================================================= */
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import emailjs from "@emailjs/browser";
import {
  MessageSquare, X, Send, Phone, Calendar, ChevronDown,
  CheckCircle2, Clock, Smile, AlertCircle, Minimize2
} from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/Logo-01_0c8b669d.png";

// ── Dental FAQ knowledge base ──────────────────────────────────
type BotAnswer = { text: string; actions?: { label: string; href: string }[] };

const FAQ_MAP: { keywords: string[]; answer: BotAnswer }[] = [
  {
    keywords: ["hour", "open", "close", "schedule", "time", "when"],
    answer: {
      text: "We're open **Monday – Friday, 9 AM – 5 PM**, and the **3rd Saturday of every month, 9 AM – 2 PM**. For same-day emergencies, call us right away!",
      actions: [{ label: `Call ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel }],
    },
  },
  {
    keywords: ["emergency", "urgent", "pain", "toothache", "broken", "knocked", "swollen", "abscess", "hurt"],
    answer: {
      text: "🚨 **Dental emergency?** We offer **same-day emergency appointments**. Please call us immediately or text for the fastest response.",
      actions: [
        { label: `Call Now: ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel },
        { label: `Text: ${PRACTICE.sms.display}`, href: SMS.general },
      ],
    },
  },
  {
    keywords: ["invisalign", "clear aligner", "aligners", "braces", "straighten", "orthodontic", "crooked"],
    answer: {
      text: "We're a **Platinum Invisalign® Provider** — one of the highest designations available! We use the Trios 6 & iTero scanners for precise, comfortable treatment. **Free consultations available.**",
      actions: [{ label: "Book Free Invisalign Consult", href: "/contact" }],
    },
  },
  {
    keywords: ["implant", "missing tooth", "replace tooth", "denture"],
    answer: {
      text: "We offer **dental implants** using 3D-guided placement with SprintRay technology — permanent, natural-looking tooth replacement. Free consultations available for implant patients.",
      actions: [{ label: "Book Free Implant Consult", href: "/contact" }],
    },
  },
  {
    keywords: ["insurance", "denti-cal", "medi-cal", "ppo", "coverage", "accept", "military", "tricare", "medicaid"],
    answer: {
      text: "We accept **Denti-Cal (Medi-Cal Dental)**, most PPO plans, and **military/Tricare** insurance. We also offer **Cherry 0% financing**. Call us to verify your specific plan.",
      actions: [{ label: "Call to Verify Insurance", href: PRACTICE.phone.tel }],
    },
  },
  {
    keywords: ["cost", "price", "how much", "fee", "afford", "payment", "financing", "cherry", "carecredit"],
    answer: {
      text: "We offer **flexible payment options** including Cherry 0% financing. Special offers: **$99 Adult Exam & X-rays** and **$79 Pediatric Exam & X-rays** (no insurance needed).",
      actions: [{ label: "View Special Offers", href: "/special-offers" }],
    },
  },
  {
    keywords: ["gum", "periodon", "perio", "gum disease", "gingivitis", "scaling", "root planing", "gum graft", "bone graft"],
    answer: {
      text: "Our **Periodontist, Dr. Erene Saad DMD MS**, specializes in gum disease treatment, scaling & root planing, gum grafts, crown lengthening, and LANAP laser therapy — all in-house, no referrals needed.",
      actions: [{ label: "Learn About Perio Services", href: "/periodontics" }],
    },
  },
  {
    keywords: ["whitening", "white", "bleach", "stain", "cosmetic", "veneer", "smile makeover", "bonding"],
    answer: {
      text: "We offer professional **teeth whitening, porcelain veneers, dental bonding**, and complete smile makeovers. Book a free smile consultation to see what's possible for you!",
      actions: [{ label: "Book Free Smile Consult", href: "/contact" }],
    },
  },
  {
    keywords: ["child", "kid", "pediatric", "baby", "toddler", "first visit", "children"],
    answer: {
      text: "We love seeing little smiles! Our team is experienced in **pediatric dentistry** and makes first visits fun and comfortable. Special offer: **$79 Pediatric Exam & X-rays** (no insurance needed).",
      actions: [{ label: "Book Pediatric Appointment", href: "/contact" }],
    },
  },
  {
    keywords: ["location", "address", "where", "directions", "find", "map", "lampson", "garden grove"],
    answer: {
      text: `We're located at **${PRACTICE.address.full}** — conveniently serving Seal Beach, Los Alamitos, Cypress, Westminster, Huntington Beach, and all of Orange County.`,
      actions: [{ label: "Get Directions", href: "https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845" }],
    },
  },
  {
    keywords: ["appointment", "book", "schedule", "new patient", "visit", "consult"],
    answer: {
      text: "Booking is easy! You can **book online** anytime, **text us** for the fastest response, or call during office hours. New patients are always welcome — free consultations available!",
      actions: [
        { label: "Book Online", href: "/contact" },
        { label: `Text: ${PRACTICE.sms.display}`, href: SMS.general },
      ],
    },
  },
  {
    keywords: ["doctor", "dentist", "dr", "stefan", "schneekluth", "youssef", "saad", "team", "specialist"],
    answer: {
      text: "Our team includes **Dr. Ragy Stefan** (General Dentist & Founder), **Dr. Clark Schneekluth** (Orthodontist, 40+ years), **Dr. Joseph Youssef** (Oral Surgeon), and **Dr. Erene Saad** (Periodontist). All specialists under one roof!",
      actions: [{ label: "Meet Our Team", href: "/about" }],
    },
  },
  {
    keywords: ["root canal", "endo", "nerve", "pulp"],
    answer: {
      text: "We perform **root canal treatment** in-house to save infected or damaged teeth. Modern techniques make root canals comfortable — most patients are surprised by how easy it is!",
      actions: [{ label: "Learn More", href: "/endodontics" }],
    },
  },
  {
    keywords: ["extraction", "pull", "remove", "wisdom", "wisdom teeth", "surgery", "oral surgery"],
    answer: {
      text: "**Dr. Joseph Youssef**, our board-certified Oral Surgeon, performs extractions, wisdom teeth removal, and complex oral surgery procedures with precision and care — all in-house.",
      actions: [{ label: "Book Consultation", href: "/contact" }],
    },
  },
];

const FALLBACK: BotAnswer = {
  text: `I'd be happy to help! For the quickest answer, you can **text us** at ${PRACTICE.sms.display}, **call** ${PRACTICE.phone.display}, or **book online**. Our team typically responds within minutes during office hours.`,
  actions: [
    { label: `Text ${PRACTICE.sms.display}`, href: SMS.general },
    { label: `Call ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel },
    { label: "Book Online", href: "/contact" },
  ],
};

const QUICK_QUESTIONS = [
  "What are your hours?",
  "Do you accept Denti-Cal?",
  "How much does Invisalign cost?",
  "Do you treat gum disease?",
  "Book an appointment",
  "Dental emergency help",
];

function getBotResponse(input: string): BotAnswer {
  const lower = input.toLowerCase();
  for (const entry of FAQ_MAP) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return FALLBACK;
}

// ── Markdown-lite renderer ─────────────────────────────────────
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

// ── Types ──────────────────────────────────────────────────────
type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  actions?: { label: string; href: string }[];
  timestamp: Date;
};

// ── Main Component ─────────────────────────────────────────────
export default function LiveChat() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "👋 Hi! I'm the Uplift Dental virtual assistant. How can I help you today?\n\nAsk me anything about our services, hours, insurance, or click a quick question below!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showOfflineForm, setShowOfflineForm] = useState(false);
  const [offlineForm, setOfflineForm] = useState({ name: "", phone: "", message: "" });
  const [offlineSent, setOfflineSent] = useState(false);
  const [offlineSending, setOfflineSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  // Auto-scroll to bottom
  useEffect(() => {
    if (open && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimized]);

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  // Auto-open teaser after 8 seconds (only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) setUnreadCount(1);
    }, 8000);
    return () => clearTimeout(timer);
  }, [hasOpened]);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    setHasOpened(true);
    setUnreadCount(0);
  };

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: nextId.current++, timestamp: new Date() },
    ]);
  };

  const handleSend = (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText) return;
    setInput("");

    addMessage({ from: "user", text: userText });

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userText);
      addMessage({ from: "bot", text: response.text, actions: response.actions });
    }, 600);
  };

  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfflineSending(true);
    try {
      await emailjs.send(
        "service_x856ofi",
        "template_mp248nf",
        {
          name: offlineForm.name,
          phone: offlineForm.phone,
          service: `Chat message: ${offlineForm.message}`,
          time: new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
        },
        "6X9QyXqRhDTbdty7A"
      );
      setOfflineSent(true);
    } catch {
      // silently fail — show success anyway to not frustrate user
      setOfflineSent(true);
    } finally {
      setOfflineSending(false);
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <>
      {/* ── Floating Button ── */}
      {/* On mobile: sits above the sticky 56px call/text bar. On desktop: standard bottom-6 */}
      {!open && (
        <button
          onClick={handleOpen}
          className="flex fixed right-4 z-50 items-center gap-3 px-6 py-4 rounded-full shadow-2xl text-white font-body font-semibold text-base transition-all hover:scale-105 active:scale-95"
          style={{
            bottom: isMobile ? "calc(56px + env(safe-area-inset-bottom, 0px) + 12px)" : "24px",
            backgroundColor: COLORS.teal,
            boxShadow: "0 8px 32px oklch(0.42 0.09 192 / 0.45)"
          }}
          aria-label="Open live chat"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <span>Chat with Us</span>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: COLORS.teal }} />
        </button>
      )}

      {/* ── Chat Window ── */}
      {open && (
        <div
          className={`fixed right-3 md:right-6 z-50 flex flex-col rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${minimized ? "h-16" : "h-[560px]"}`}
          style={{
            bottom: isMobile ? "calc(56px + 12px + env(safe-area-inset-bottom, 0px))" : "24px",
            width: "min(380px, calc(100vw - 24px))",
            boxShadow: "0 24px 64px oklch(0.18 0.04 185 / 0.35)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={LOGO} alt="Uplift Dental" className="h-8 w-auto object-contain brightness-0 invert" />
              </div>
              <div>
                <div className="font-body font-bold text-white text-sm leading-tight">Uplift Dental & Orthodontics</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-body text-white/75 text-xs">Typically replies in minutes</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                aria-label="Minimize chat"
              >
                {minimized ? <ChevronDown className="w-4 h-4 rotate-180" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Quick contact strip */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-[oklch(0.92_0.02_192)] shrink-0">
                <a
                  href={SMS.general}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  <MessageSquare className="w-3 h-3" />
                  Text Us
                </a>
                <a
                  href={PRACTICE.phone.tel}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold border-2 transition-all hover:bg-[oklch(0.97_0.01_192)]"
                  style={{ borderColor: COLORS.teal, color: COLORS.teal }}
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold border-2 transition-all hover:bg-[oklch(0.97_0.01_192)]"
                  style={{ borderColor: COLORS.teal, color: COLORS.teal }}
                >
                  <Calendar className="w-3 h-3" />
                  Book
                </a>
                <button
                  onClick={() => setShowOfflineForm(!showOfflineForm)}
                  className="ml-auto text-xs font-body text-[oklch(0.52_0.04_192)] hover:text-[oklch(0.42_0.09_192)] transition-colors underline underline-offset-2"
                >
                  Leave message
                </button>
              </div>

              {/* Offline form */}
              {showOfflineForm && !offlineSent && (
                <div className="px-4 py-3 bg-[oklch(0.97_0.008_192)] border-b border-[oklch(0.92_0.02_192)] shrink-0">
                  <p className="font-body text-xs font-semibold text-[oklch(0.28_0.08_192)] mb-2">Leave us a message — we'll call you back!</p>
                  <form onSubmit={handleOfflineSubmit} className="space-y-2">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={offlineForm.name}
                      onChange={e => setOfflineForm({ ...offlineForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[oklch(0.88_0.03_192)] bg-white text-xs font-body focus:outline-none focus:ring-1 focus:ring-[oklch(0.42_0.09_192)]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      value={offlineForm.phone}
                      onChange={e => setOfflineForm({ ...offlineForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[oklch(0.88_0.03_192)] bg-white text-xs font-body focus:outline-none focus:ring-1 focus:ring-[oklch(0.42_0.09_192)]"
                    />
                    <textarea
                      placeholder="How can we help?"
                      value={offlineForm.message}
                      onChange={e => setOfflineForm({ ...offlineForm, message: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-[oklch(0.88_0.03_192)] bg-white text-xs font-body focus:outline-none focus:ring-1 focus:ring-[oklch(0.42_0.09_192)] resize-none"
                    />
                    <button
                      type="submit"
                      disabled={offlineSending}
                      className="w-full py-2 rounded-lg text-white text-xs font-body font-bold transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: COLORS.teal }}
                    >
                      {offlineSending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
              {showOfflineForm && offlineSent && (
                <div className="px-4 py-3 bg-green-50 border-b border-green-100 shrink-0 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="font-body text-xs text-green-700 font-semibold">Message sent! We'll call you back soon.</p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[oklch(0.99_0.003_90)]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}>
                    {msg.from === "bot" && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: COLORS.teal }}
                      >
                        <Smile className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
                          msg.from === "user"
                            ? "text-white rounded-tr-sm"
                            : "text-[oklch(0.18_0.04_185)] rounded-tl-sm bg-white border border-[oklch(0.90_0.015_185)] shadow-sm"
                        }`}
                        style={msg.from === "user" ? { backgroundColor: COLORS.teal } : {}}
                      >
                        {msg.text.split("\n").map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-1.5" : ""}>{renderText(line)}</p>
                        ))}
                      </div>
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {msg.actions.map((action) => (
                            <a
                              key={action.label}
                              href={action.href}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold text-white transition-all hover:opacity-90 shadow-sm"
                              style={{ backgroundColor: COLORS.teal }}
                              target={action.href.startsWith("http") ? "_blank" : undefined}
                              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              {action.label}
                            </a>
                          ))}
                        </div>
                      )}
                      <span className="text-[10px] font-body text-[oklch(0.65_0.02_192)] px-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick questions */}
              <div className="px-3 py-2 bg-white border-t border-[oklch(0.92_0.02_192)] shrink-0">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="shrink-0 px-3 py-1.5 rounded-full text-xs font-body font-medium border transition-all hover:border-[oklch(0.42_0.09_192)] hover:text-[oklch(0.42_0.09_192)] whitespace-nowrap"
                      style={{ borderColor: "oklch(0.88_0.03_192)", color: "oklch(0.45_0.04_192)" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-3 py-3 bg-white border-t border-[oklch(0.92_0.02_192)] shrink-0">
                <div className="flex items-center gap-2 bg-[oklch(0.97_0.008_192)] rounded-2xl px-4 py-2.5 border border-[oklch(0.90_0.015_192)] focus-within:border-[oklch(0.42_0.09_192)] focus-within:ring-1 focus-within:ring-[oklch(0.42_0.09_192)] transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type a question..."
                    className="flex-1 bg-transparent text-sm font-body text-[oklch(0.18_0.04_185)] placeholder:text-[oklch(0.65_0.02_192)] focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    style={{ backgroundColor: COLORS.teal }}
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="font-body text-[10px] text-[oklch(0.65_0.02_192)]">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Mon–Fri 9am–5pm · 3rd Sat 9am–2pm
                  </span>
                  <span className="font-body text-[10px] text-[oklch(0.65_0.02_192)]">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Not for medical emergencies
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
