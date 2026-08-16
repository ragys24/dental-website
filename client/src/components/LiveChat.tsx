/* =============================================================
   UPLIFT DENTAL — Privacy-first Interactive Guide
   Design: Elevated Warmth — calm teal, guided topic choices,
   general-information only. This client-only guide does not
   collect health details, offer individualized care advice, or
   submit chat content to an external service.
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  CreditCard,
  HelpCircle,
  MapPin,
  MessageSquare,
  Minimize2,
  Phone,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { PRACTICE, COLORS } from "@/lib/constants";
import { SMS } from "@/lib/sms";
import { trackSchedule } from "@/lib/tracking";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519418507/8XjTa97CZebFmBgqStQiLN/logo-primary-optimized_5fbb89d5.png";

type ChatAction = { label: string; href: string };
type BotAnswer = {
  text: string;
  actions?: ChatAction[];
  followUps?: string[];
};

type Topic = {
  label: string;
  prompt: string;
  icon: "services" | "visit" | "insurance" | "location" | "urgent" | "help";
};

const TOPICS: Topic[] = [
  { label: "Services", prompt: "What services do you offer?", icon: "services" },
  { label: "Plan a visit", prompt: "How do I plan a visit?", icon: "visit" },
  { label: "Insurance & payment", prompt: "What insurance and payment options are available?", icon: "insurance" },
  { label: "Location & hours", prompt: "Where are you located and when are you open?", icon: "location" },
  { label: "Urgent care", prompt: "I need urgent dental help", icon: "urgent" },
  { label: "Ask a general question", prompt: "I have a general question", icon: "help" },
];

const QUICK_QUESTIONS = [
  "What are your hours?",
  "Do you accept Denti-Cal?",
  "Tell me about Invisalign",
  "What should I bring to a first visit?",
];

const GENERAL_GUIDANCE: BotAnswer = {
  text: "I can help with **general office information**—services, hours, location, preparing for a visit, insurance and payment options, or ways to contact the team. For privacy, please don't share symptoms, health history, photos, insurance IDs, or other personal details here.",
  followUps: QUICK_QUESTIONS,
};

const PRIVACY_REDIRECT: BotAnswer = {
  text: "For your privacy, I can't review personal health, insurance, or treatment details in chat. Please call or text the office for help with your specific situation. If you believe you have a dental emergency, call us now; for a life-threatening emergency, call 911.",
  actions: [
    { label: `Call ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel },
    { label: `Text ${PRACTICE.sms.display}`, href: SMS.general },
  ],
  followUps: ["What are your hours?", "How do I plan a visit?"],
};

const FAQ_MAP: { keywords: string[]; answer: BotAnswer }[] = [
  {
    keywords: ["hour", "open", "close", "schedule", "time", "when"],
    answer: {
      text: "Our regular office hours are **Monday–Friday, 9 AM–5 PM**, plus the **third Saturday of each month, 9 AM–2 PM**. Call the office to confirm availability for a specific day.",
      actions: [{ label: `Call ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel }],
      followUps: ["Where are you located?", "How do I plan a visit?"],
    },
  },
  {
    keywords: ["emergency", "urgent", "same day", "toothache", "broken", "swollen", "pain"],
    answer: {
      text: "I can't assess a dental concern through chat. For urgent dental help, please call our office now so the team can guide you. For a life-threatening emergency, call 911.",
      actions: [{ label: `Call now: ${PRACTICE.phone.display}`, href: PRACTICE.phone.tel }],
      followUps: ["What are your hours?", "Where are you located?"],
    },
  },
  {
    keywords: ["invisalign", "clear aligner", "aligners", "braces", "orthodontic", "straighten"],
    answer: {
      text: "Uplift offers orthodontic consultations for **clear aligners and braces**. The team can explain general options and schedule a consultation; suitability and treatment recommendations are discussed directly with a clinician.",
      actions: [{ label: "Explore Invisalign", href: "/invisalign" }, { label: "Plan a consultation", href: "/contact" }],
      followUps: ["What should I bring to a first visit?", "What payment options are available?"],
    },
  },
  {
    keywords: ["service", "services", "offer", "implant", "crown", "cleaning", "root canal", "extraction", "whitening", "veneer", "gum"],
    answer: {
      text: "Our general-information pages cover preventive, restorative, cosmetic, implant, periodontal, endodontic, oral surgery, and orthodontic services. A consultation is the right place for any personal treatment question.",
      actions: [{ label: "Browse services", href: "/services" }, { label: "Plan a visit", href: "/contact" }],
      followUps: ["Tell me about Invisalign", "What payment options are available?"],
    },
  },
  {
    keywords: ["delta dental", "aetna", "cigna", "metlife", "guardian", "anthem", "blue cross", "blue shield", "united healthcare", "unitedhealthcare", "uhc", "humana"],
    answer: {
      text: "Plans such as **Delta Dental** are common PPO plans. Whether the office participates and what a visit may include depends on your specific plan, employer option, eligibility, and current benefits. Please call the office for a private verification—please don't send a member ID, policy number, or personal details in this chat.",
      actions: [{ label: `Call to verify a plan`, href: PRACTICE.phone.tel }, { label: "Insurance & financing", href: "/insurance-financing" }],
      followUps: ["How do I plan a visit?", "What should I bring to a first visit?"],
    },
  },
  {
    keywords: ["insurance", "denti-cal", "medi-cal", "ppo", "tricare", "coverage", "payment", "financing", "carecredit", "cherry", "cost", "price", "fee"],
    answer: {
      text: "Uplift works with **Denti-Cal (Medi-Cal Dental)**, many PPO plans, and military/Tricare plans, and offers financing resources. Benefits, eligibility, treatment costs, and current financing terms are personal matters, so the office team can review those directly with you.",
      actions: [{ label: "Insurance & financing", href: "/insurance-financing" }, { label: `Call the office`, href: PRACTICE.phone.tel }],
      followUps: ["What should I bring to a first visit?", "How do I plan a visit?"],
    },
  },
  {
    keywords: ["first visit", "new patient", "bring", "prepare", "appointment", "book", "visit", "consult"],
    answer: {
      text: "To plan a visit, choose a time online or contact the office. The team can explain current scheduling, paperwork, and what information is appropriate to bring. Please don't send personal medical or insurance information through this chat.",
      actions: [{ label: "Plan a visit", href: "/contact" }, { label: `Text ${PRACTICE.sms.display}`, href: SMS.general }],
      followUps: ["What are your hours?", "What insurance options are available?"],
    },
  },
  {
    keywords: ["location", "address", "where", "directions", "map", "garden grove", "parking"],
    answer: {
      text: `Uplift Dental & Orthodontics is at **${PRACTICE.address.full}** in Garden Grove. The office serves patients from nearby Orange County communities.`,
      actions: [{ label: "Get directions", href: "https://maps.google.com/?q=5253+Lampson+Ave+Garden+Grove+CA+92845" }],
      followUps: ["What are your hours?", "How do I plan a visit?"],
    },
  },
  {
    keywords: ["doctor", "dentist", "team", "specialist", "orthodontist"],
    answer: {
      text: "Uplift brings general dental care and specialty services together in one office. You can learn about the team and the services they provide on our About page.",
      actions: [{ label: "Meet the team", href: "/about" }, { label: "Browse services", href: "/services" }],
      followUps: ["Tell me about Invisalign", "How do I plan a visit?"],
    },
  },
];

const PRIVATE_INPUT_PATTERNS = [
  /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
  /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/i,
  /\b(?:date of birth|dob|member id|insurance id|policy number|medical record|social security|ssn)\b/i,
  /\b(?:my|i|me|my child|my son|my daughter)\b.{0,50}\b(?:pain|hurt|bleed|swollen|infection|medicine|medication|diagnosis|symptom|tooth|gum|jaw)\b/i,
];

function containsPersonalOrHealthDetails(input: string) {
  return PRIVATE_INPUT_PATTERNS.some((pattern) => pattern.test(input));
}

function getBotResponse(input: string): BotAnswer {
  const normalized = input.toLowerCase();
  for (const entry of FAQ_MAP) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) return entry.answer;
  }
  return GENERAL_GUIDANCE;
}

function renderText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <span key={index}>{part}</span>,
  );
}

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  actions?: ChatAction[];
  followUps?: string[];
  timestamp: Date;
};

function TopicIcon({ topic }: { topic: Topic["icon"] }) {
  const common = "w-4 h-4";
  if (topic === "services") return <Stethoscope className={common} />;
  if (topic === "visit") return <Calendar className={common} />;
  if (topic === "insurance") return <CreditCard className={common} />;
  if (topic === "location") return <MapPin className={common} />;
  if (topic === "urgent") return <AlertCircle className={common} />;
  return <HelpCircle className={common} />;
}

export default function LiveChat() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Welcome to Uplift Dental. I can help with **general office information** and point you to the right next step. Please don't share health details or personal information in chat.",
      followUps: QUICK_QUESTIONS,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [privacyNotice, setPrivacyNotice] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (open && !minimized) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, minimized]);

  useEffect(() => {
    if (!open || minimized) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, [open, minimized]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasOpened) setUnreadCount(1);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [hasOpened]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    setMessages((previous) => [...previous, { ...message, id: nextId.current++, timestamp: new Date() }]);
  };

  const answerGeneralQuestion = (question: string) => {
    const response = getBotResponse(question);
    window.setTimeout(() => addMessage({ from: "bot", ...response }), 260);
  };

  const handleSend = (providedText?: string) => {
    const userText = (providedText ?? input).trim();
    if (!userText) return;
    setInput("");

    if (containsPersonalOrHealthDetails(userText)) {
      setPrivacyNotice(true);
      addMessage({ from: "bot", ...PRIVACY_REDIRECT });
      return;
    }

    setPrivacyNotice(false);
    addMessage({ from: "user", text: userText });
    answerGeneralQuestion(userText);
  };

  const handleTopic = (topic: Topic) => handleSend(topic.prompt);
  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <>
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); setHasOpened(true); setUnreadCount(0); }}
          className="fixed right-4 z-50 flex items-center gap-3 rounded-full px-6 py-4 text-base font-semibold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
          style={{
            bottom: isMobile ? "calc(56px + env(safe-area-inset-bottom, 0px) + 12px)" : "24px",
            backgroundColor: COLORS.teal,
            boxShadow: "0 8px 32px oklch(0.42 0.09 192 / 0.45)",
          }}
          aria-label="Open Uplift Dental information guide"
        >
          <span className="relative"><MessageSquare className="w-6 h-6" />{unreadCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unreadCount}</span>}</span>
          <span>Ask Uplift</span>
          <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: COLORS.teal }} />
        </button>
      )}

      {open && (
        <div
          className={`fixed right-3 z-50 flex flex-col overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 md:right-6 ${minimized ? "h-16" : "h-[590px]"}`}
          style={{ bottom: isMobile ? "calc(56px + 12px + env(safe-area-inset-bottom, 0px))" : "24px", width: "min(390px, calc(100vw - 24px))", boxShadow: "0 24px 64px oklch(0.18 0.04 185 / 0.35)" }}
          aria-label="Uplift Dental information guide"
        >
          <div className="flex shrink-0 items-center justify-between px-4 py-3" style={{ background: `linear-gradient(135deg, ${COLORS.tealDark} 0%, ${COLORS.teal} 100%)` }}>
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="Uplift Dental" className="h-8 w-auto object-contain brightness-0 invert" />
              <div>
                <div className="font-body text-sm font-bold leading-tight text-white">Uplift information guide</div>
                <div className="mt-0.5 flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-teal-100" /><span className="font-body text-xs text-white/80">General questions only · no health details</span></div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimized(!minimized)} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white" aria-label="Minimize guide">{minimized ? <ChevronDown className="w-4 h-4 rotate-180" /> : <Minimize2 className="w-4 h-4" />}</button>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white" aria-label="Close guide"><X className="w-4 h-4" /></button>
            </div>
          </div>

          {!minimized && (
            <>
              <div className="grid shrink-0 grid-cols-3 gap-2 border-b border-[oklch(0.92_0.02_192)] bg-white px-3 py-2">
                <a href={SMS.general} onClick={trackSchedule} className="flex items-center justify-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: COLORS.teal }}><MessageSquare className="w-3 h-3" />Text</a>
                <a href={PRACTICE.phone.tel} onClick={trackSchedule} className="flex items-center justify-center gap-1.5 rounded-full border-2 px-2 py-1.5 text-xs font-semibold transition-colors hover:bg-[oklch(0.97_0.01_192)]" style={{ borderColor: COLORS.teal, color: COLORS.teal }}><Phone className="w-3 h-3" />Call</a>
                <a href="/contact" onClick={trackSchedule} className="flex items-center justify-center gap-1.5 rounded-full border-2 px-2 py-1.5 text-xs font-semibold transition-colors hover:bg-[oklch(0.97_0.01_192)]" style={{ borderColor: COLORS.teal, color: COLORS.teal }}><Calendar className="w-3 h-3" />Visit</a>
              </div>

              <div className="shrink-0 border-b border-[oklch(0.92_0.02_192)] bg-[oklch(0.98_0.008_192)] px-3 py-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[oklch(0.30_0.07_192)]"><Sparkles className="h-3.5 w-3.5" />Explore a topic</div>
                <div className="grid grid-cols-2 gap-2">
                  {TOPICS.map((topic) => <button key={topic.label} onClick={() => handleTopic(topic)} className="flex items-center gap-2 rounded-xl border border-[oklch(0.89_0.025_192)] bg-white px-2.5 py-2 text-left text-xs font-semibold text-[oklch(0.33_0.055_192)] shadow-sm transition-colors hover:border-[oklch(0.42_0.09_192)] hover:text-[oklch(0.37_0.08_192)]"><TopicIcon topic={topic.icon} />{topic.label}</button>)}
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-[oklch(0.99_0.003_90)] px-4 py-4" aria-live="polite">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-2 ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                    {message.from === "bot" && <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: COLORS.teal }}><Smile className="w-4 h-4 text-white" /></div>}
                    <div className={`flex max-w-[83%] flex-col gap-1.5 ${message.from === "user" ? "items-end" : "items-start"}`}>
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.from === "user" ? "rounded-tr-sm text-white" : "rounded-tl-sm border border-[oklch(0.90_0.015_185)] bg-white text-[oklch(0.18_0.04_185)] shadow-sm"}`} style={message.from === "user" ? { backgroundColor: COLORS.teal } : {}}>{message.text.split("\n").map((line, index) => <p key={index} className={index ? "mt-1.5" : ""}>{renderText(line)}</p>)}</div>
                      {message.actions && <div className="flex flex-wrap gap-2">{message.actions.map((action) => <a key={action.label} href={action.href} onClick={trackSchedule} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90" style={{ backgroundColor: COLORS.teal }} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}>{action.label}</a>)}</div>}
                      {message.followUps && <div className="flex flex-wrap gap-1.5">{message.followUps.map((followUp) => <button key={followUp} onClick={() => handleSend(followUp)} className="rounded-full border border-[oklch(0.84_0.03_192)] bg-white px-2.5 py-1 text-xs font-medium text-[oklch(0.38_0.06_192)] transition-colors hover:border-[oklch(0.42_0.09_192)]">{followUp}</button>)}</div>}
                      <span className="px-1 text-[10px] text-[oklch(0.65_0.02_192)]">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 border-t border-[oklch(0.92_0.02_192)] bg-white px-3 py-3">
                {privacyNotice && <div role="status" className="mb-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">For privacy, this chat does not accept personal health, insurance, or contact details. Please call or text the office instead.</div>}
                <div className="flex items-center gap-2 rounded-2xl border border-[oklch(0.90_0.015_192)] bg-[oklch(0.97_0.008_192)] px-4 py-2.5 focus-within:border-[oklch(0.42_0.09_192)] focus-within:ring-1 focus-within:ring-[oklch(0.42_0.09_192)]">
                  <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); handleSend(); } }} placeholder="Ask a general office question…" aria-describedby="chat-privacy-note" className="flex-1 bg-transparent text-sm text-[oklch(0.18_0.04_185)] placeholder:text-[oklch(0.65_0.02_192)] focus:outline-none" />
                  <button onClick={() => handleSend()} disabled={!input.trim()} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40" style={{ backgroundColor: COLORS.teal }} aria-label="Ask general question"><Send className="w-3.5 h-3.5" /></button>
                </div>
                <div id="chat-privacy-note" className="mt-2 flex items-start gap-1.5 px-1 text-[10px] leading-relaxed text-[oklch(0.55_0.025_192)]"><ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />Please do not share symptoms, treatment details, photos, insurance IDs, names, email addresses, or phone numbers here.</div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
