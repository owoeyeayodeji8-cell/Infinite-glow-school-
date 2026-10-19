import { useCallback, useEffect, useRef, useState, FormEvent, ReactNode } from "react";
import { GraduationCap, BookOpen, ShieldCheck, Camera, Heart, Smile, Building2, Sparkles, Wallet, UserCheck, Baby, Puzzle, Pencil, Clock, MessageCircle, Phone, Mail, MapPin, Menu, X, Check, Loader2, ChevronDown } from "lucide-react";
import { SITE, NAV, CHIPS, ABOUT, PROGRAMS, WHY, VALUES, FAC, LETTER, SIGN } from "./data/constants";

const CHIP_ICONS = [GraduationCap, BookOpen, ShieldCheck, Camera];
const PROG_ICONS = [Baby, Puzzle, Pencil, GraduationCap, Clock];
const WHY_ICONS = [UserCheck, Smile, Building2, BookOpen, Heart, ShieldCheck, Camera, Wallet, Sparkles];

function Reveal({ children, k = "up", d = 0, className = "" }: { children: ReactNode; k?: "up" | "left" | "right" | "zoom"; d?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    const t = setTimeout(() => { if (el.getBoundingClientRect().top < window.innerHeight) setOn(true); }, 1500);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);
  return <div ref={ref} style={{ transitionDelay: on ? `${d}ms` : "0ms" }} className={`rv rv-${k} ${on ? "in" : ""} ${className}`}>{children}</div>;
}

function Section({ id, bg, children }: { id: string; bg: string; children: ReactNode }) {
  return <section id={id} className={`relative overflow-hidden py-16 sm:py-20 ${bg}`}><div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div></section>;
}

function Head({ t, sub, light }: { t: string; sub?: string; light?: boolean }) {
  return <Reveal className="mb-10"><h2 className={`font-head font-bold leading-tight ${light ? "text-white" : "text-navy"}`} style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)" }}>{t}</h2><span className="bar" />{sub && <p className={`mt-4 max-w-2xl text-lg ${light ? "text-white" : ""}`}>{sub}</p>}</Reveal>;
}

function Navbar() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const solid = sc || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Infinite Glow Schools logo" width={56} height={48} className="h-12 w-auto" />
          <span className={`font-head text-base font-semibold ${solid ? "text-navy" : "text-white"}`}>Infinite Glow Schools</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map(([l, h]) => <a key={h} href={h} className={`ulk text-sm font-semibold ${solid ? "text-navy" : "text-white"}`}>{l}</a>)}
          <a href="#contact" className="btn bg-orange text-white">Enrol Now</a>
        </nav>
        <button className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${solid ? "border-navy text-navy" : "border-white text-white"}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <div className={`menu lg:hidden ${open ? "open" : ""}`}>
        <nav className="overflow-hidden bg-white" aria-label="Mobile">
          <div className="flex flex-col px-4 pb-4">
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-sky py-3 font-semibold text-navy">{l}</a>)}
            <a href="#contact" onClick={() => setOpen(false)} className="btn mt-4 bg-orange text-white">Enrol Now</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const d = (n: number) => ({ animationDelay: `${n * 100}ms` });
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy">
      <img src="/images/playground.jpg" alt="Children’s play area with trampoline, slide and toys at Infinite Glow Schools" width={1280} height={960} className="absolute inset-0 z-0 h-full w-full object-cover" />
      <div className="hero-ov pointer-events-none absolute inset-0 z-0" />
      <div className="hero-glow pointer-events-none absolute inset-0 z-0" />
      <span className="fl pointer-events-none absolute right-[-60px] top-40 z-0 h-48 w-48 rounded-full bg-orange/30" />
      <span className="fl pointer-events-none absolute bottom-40 left-[-70px] z-0 h-40 w-40 rounded-full bg-white/10" style={{ animationDelay: "-4s" }} />
      <span className="tw pointer-events-none absolute right-[18%] top-[30%] z-0 text-3xl text-orange" aria-hidden="true">✦</span>
      <span className="tw pointer-events-none absolute left-[8%] top-[62%] z-0 text-2xl text-white/80" style={{ animationDelay: "-1.2s" }} aria-hidden="true">✦</span>
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <h1 className="hu max-w-3xl font-head font-bold text-white" style={{ fontSize: "clamp(2.25rem,6vw,4rem)", lineHeight: 1.1 }}>Where Every Child Glows</h1>
        <p className="hu mt-5 max-w-xl text-lg text-white sm:text-xl" style={d(1)}>Admissions are ongoing for Crèche, Pre-Nursery, Nursery and Primary</p>
        <div className="hu mt-8 flex flex-col gap-3 sm:flex-row" style={d(2)}>
          <a href="#contact" className="btn glow bg-orange text-white">Enrol Your Child</a>
          <a href={SITE.waLink} target="_blank" rel="noopener noreferrer" className="btn border-2 border-white text-white"><MessageCircle size={20} />Chat on WhatsApp</a>
        </div>
        <div className="hu mt-8 flex flex-wrap gap-2" style={d(3)}>
          {CHIPS.map((c, i) => { const I = CHIP_ICONS[i]; return <span key={c} className="chip"><I size={18} />{c}</span>; })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-10 overflow-hidden" aria-hidden="true">
        <svg className="drift h-10 w-[200%]" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0 20Q180 0 360 20T720 20T1080 20T1440 20V40H0Z" fill="#FFF7F0" /></svg>
      </div>
    </section>
  );
}

function About() {
  const k = ["left", "zoom", "right"] as const;
  return (
    <Section id="about" bg="bg-cream">
      <Head t="About Infinite Glow Schools" />
      <div className="grid gap-6 md:grid-cols-3">
        {ABOUT.map((a, i) => <Reveal key={a.t} k={k[i]} d={i * 100} className="h-full"><div className="card h-full"><h3 className="mb-2 font-head text-xl font-semibold text-navy">{a.t}</h3><p>{a.p}</p></div></Reveal>)}
      </div>
    </Section>
  );
}

function Director() {
  const [open, setOpen] = useState(false);
  const hide = open ? "" : "hidden lg:block";
  return (
    <Section id="director" bg="bg-white">
      <Head t="A Message from the Director" sub="Infinite Glow Schools - Where Every Child Glows" />
      <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr]">
        <Reveal k="zoom">
          <div className="relative mx-auto w-full max-w-[360px] md:max-w-[420px] lg:max-w-none">
            <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-[3px] border-orange" />
            <img src="/images/director-portrait.jpg" alt="Director of Infinite Glow Schools" width={810} height={1080} loading="lazy" className="relative aspect-[3/4] w-full rounded-3xl object-cover object-top shadow-xl" />
          </div>
        </Reveal>
        <Reveal k="right">
          <div className="rounded-3xl border-l-[6px] border-orange bg-cream p-6 shadow-lg sm:p-8">
            <p className="font-head text-5xl leading-none text-orange" aria-hidden="true">“</p>
            <p className="mb-6 text-xl font-semibold italic text-navy sm:text-2xl">Every child matters, every potential is nurtured, and every child glows!</p>
            <div id="letter" className="space-y-4 text-[17px] leading-[1.7]">
              {LETTER.map((p, i) => <p key={i} className={i > 1 ? hide : ""}>{p}</p>)}
              <div className={`pt-2 font-semibold text-navy ${hide}`}>{SIGN.map((s) => <p key={s}>{s}</p>)}</div>
            </div>
            <button type="button" aria-expanded={open} aria-controls="letter" onClick={() => setOpen(!open)} className="btn mt-6 bg-navy text-white lg:hidden">{open ? "Show less" : "Read full message"}<ChevronDown size={18} className={open ? "rotate-180" : ""} /></button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Programs() {
  return (
    <Section id="programs" bg="bg-sky">
      <Head t="Our Programs" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map(([n, desc], i) => { const I = PROG_ICONS[i]; return (
          <Reveal key={n} k="zoom" d={(i % 3) * 100} className="h-full"><div className="card h-full"><span className="ic mb-4 grid h-12 w-12 place-items-center rounded-full bg-orange/15 text-orange"><I size={26} /></span><h3 className="mb-1 font-head text-xl font-semibold text-navy">{n}</h3><p>{desc}</p></div></Reveal>
        ); })}
      </div>
    </Section>
  );
}

function Why() {
  return (
    <Section id="why" bg="bg-cream">
      <Head t="Why Choose Us" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((w, i) => { const I = WHY_ICONS[i]; return (
          <Reveal key={w} k="zoom" d={(i % 3) * 100} className="h-full"><div className="card flex h-full items-center gap-4"><span className="ic grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange/15 text-orange"><I size={24} /></span><h3 className="font-head font-semibold text-navy">{w}</h3></div></Reveal>
        ); })}
      </div>
      <Reveal className="mt-10"><div className="flex flex-wrap justify-center gap-3">{VALUES.map((v) => <span key={v} className="rounded-full bg-navy px-5 py-2 font-head font-semibold text-white">{v}</span>)}</div></Reveal>
    </Section>
  );
}

function Facilities() {
  return (
    <Section id="facilities" bg="bg-white">
      <Head t="Our Facilities" />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal><img src="/images/playground.jpg" alt="Play area with artificial turf, trampoline and slide" width={1280} height={960} loading="lazy" className="w-full rounded-3xl object-cover shadow-xl" /></Reveal>
        <Reveal k="right"><ul className="space-y-4">{FAC.map((f) => <li key={f} className="flex items-center gap-3 text-lg font-semibold text-navy"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange text-white"><Check size={20} /></span>{f}</li>)}</ul></Reveal>
      </div>
    </Section>
  );
}

const FLYERS = [
  ["/images/flyer-admission-kids.jpg", "Admission is ongoing flyer for Crèche, Nursery and Primary", "tilt-l", 853, 1280],
  ["/images/flyer-admission-backpack.jpg", "Admissions open flyer with reasons to choose Infinite Glow Schools", "tilt-r", 761, 1080],
] as const;

function Admissions({ onOpen }: { onOpen: (s: string) => void }) {
  return (
    <Section id="admissions" bg="bg-navy">
      <Head light t="Admissions Are Ongoing" sub="Available for Crèche, Nursery and Primary. Visit us or message us to secure a place." />
      <div className="mx-auto grid max-w-3xl grid-cols-2 items-start gap-4 sm:gap-8">
        {FLYERS.map(([s, a, t, w, h], i) => (
          <Reveal key={s} d={i * 120}><button type="button" onClick={() => onOpen(s)} aria-label={`Open larger: ${a}`} className={`flyer ${t} block w-full overflow-hidden rounded-2xl border-4 border-white shadow-2xl`}><img src={s} alt={a} width={w} height={h} loading="lazy" className="w-full" /></button></Reveal>
        ))}
      </div>
      <Reveal className="mt-10"><div className="flex flex-col justify-center gap-3 sm:flex-row">
        <a href={SITE.waLink} target="_blank" rel="noopener noreferrer" className="btn bg-orange text-white"><MessageCircle size={20} />Chat on WhatsApp</a>
        <a href={SITE.callLink} className="btn border-2 border-white text-white"><Phone size={20} />Call {SITE.callDisplay}</a>
      </div></Reveal>
    </Section>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = o; };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label="Admission flyer" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <button ref={btn} type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-navy"><X size={22} /></button>
      <img src={src} alt="Admission flyer, enlarged" className="lbi max-h-[90vh] max-w-full rounded-xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function EnquiryForm() {
  const [v, setV] = useState({ name: "", phone: "", cls: "Crèche", msg: "", hp: "" });
  const [er, setEr] = useState<Record<string, string>>({});
  const [st, setSt] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const set = (k: string, val: string) => setV({ ...v, [k]: val });
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (st === "sending") return;
    const x: Record<string, string> = {};
    if (!v.name.trim()) x.name = "Enter the parent or guardian’s name.";
    if (!/^(0[789][01]\d{8}|\+234[789][01]\d{8})$/.test(v.phone.replace(/\s/g, ""))) x.phone = "Enter a valid Nigerian number, such as 08012345678.";
    setEr(x);
    if (Object.keys(x).length) return;
    setSt("sending");
    try {
      const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ _subject: "New Enquiry - Infinite Glow Schools Website", "Parent Name": v.name, Phone: v.phone, "Class of Interest": v.cls, Message: v.msg, _gotcha: v.hp }) });
      setSt(r.ok ? "ok" : "err");
    } catch { setSt("err"); }
  }
  if (st === "ok") return (
    <div className="card text-center" role="status"><span className="pop mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-orange text-white"><Check size={34} /></span><p className="font-head text-xl font-semibold text-navy">Thank you! We have received your enquiry and will contact you shortly.</p><button type="button" className="btn mt-6 bg-navy text-white" onClick={() => { setV({ name: "", phone: "", cls: "Crèche", msg: "", hp: "" }); setSt("idle"); }}>Submit another enquiry</button></div>
  );
  return (
    <form onSubmit={submit} noValidate className="card space-y-4">
      <div><label htmlFor="n" className="mb-1 block font-semibold text-navy">Parent/Guardian name</label><input id="n" className="fld" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!er.name} />{er.name && <p className="mt-1 text-sm font-semibold text-red-700">{er.name}</p>}</div>
      <div><label htmlFor="p" className="mb-1 block font-semibold text-navy">Phone number</label><input id="p" type="tel" className="fld" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!er.phone} />{er.phone && <p className="mt-1 text-sm font-semibold text-red-700">{er.phone}</p>}</div>
      <div><label htmlFor="c" className="mb-1 block font-semibold text-navy">Class of interest</label><select id="c" className="fld" value={v.cls} onChange={(e) => set("cls", e.target.value)}>{PROGRAMS.map(([n]) => <option key={n}>{n}</option>)}</select></div>
      <div><label htmlFor="m" className="mb-1 block font-semibold text-navy">Message (optional)</label><textarea id="m" rows={4} className="fld" value={v.msg} onChange={(e) => set("msg", e.target.value)} /></div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={v.hp} onChange={(e) => set("hp", e.target.value)} />
      {st === "err" && <p className="font-semibold text-red-700" role="alert">We couldn’t send your enquiry. Please try again, or call us on {SITE.callDisplay}.</p>}
      <button type="submit" disabled={st === "sending"} className="btn w-full bg-orange text-white disabled:opacity-70">{st === "sending" ? <><Loader2 className="animate-spin" size={20} />Sending...</> : st === "err" ? "Try again" : "Send enquiry"}</button>
      <p className="text-sm">Your details are used only to respond to your enquiry.</p>
    </form>
  );
}

function Contact() {
  const rows = [[MessageCircle, "WhatsApp", SITE.waDisplay, SITE.waLink], [Phone, "Call", SITE.callDisplay, SITE.callLink], [Mail, "Email", SITE.email, `mailto:${SITE.email}`], [MapPin, "Address", SITE.address, ""]] as const;
  return (
    <Section id="contact" bg="bg-sky">
      <Head t="Contact Us" sub="Send an enquiry and we will get back to you." />
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal k="left"><div className="space-y-4">
          {rows.map(([I, l, t, h]) => { const inner = <><span className="ic grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange/15 text-orange"><I size={24} /></span><span><span className="block font-head font-semibold text-navy">{l}</span><span className="break-words">{t}</span></span></>;
            return h ? <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="card flex items-center gap-4">{inner}</a> : <div key={l} className="card flex items-center gap-4">{inner}</div>; })}
          <iframe title="Map showing Infinite Glow Schools in Osogbo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=1%20Adejumobi%20Street%2C%20Service%20Area%2C%20Osogbo%2C%20Osun%20State&output=embed" className="h-64 w-full rounded-2xl border-0" />
        </div></Reveal>
        <Reveal k="right"><EnquiryForm /></Reveal>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-12 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><img src="/images/logo.png" alt="Infinite Glow Schools logo" width={96} height={84} loading="lazy" className="mb-3 h-20 w-auto rounded-2xl bg-white p-2" /><p className="font-head font-semibold">Where Every Child Glows...</p></div>
        <nav aria-label="Footer"><p className="mb-2 font-head font-semibold">Quick links</p><ul className="grid grid-cols-2 gap-1">{NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-orange">{l}</a></li>)}</ul></nav>
        <div className="space-y-1"><p className="mb-2 font-head font-semibold">Contact</p><p>WhatsApp: {SITE.waDisplay}</p><p>Call: {SITE.callDisplay}</p><p className="break-words">{SITE.email}</p><p>{SITE.address}</p></div>
      </div>
      <p className="mt-10 text-center text-sm">© {new Date().getFullYear()} Infinite Glow Schools. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  const [lb, setLb] = useState<string | null>(null);
  const close = useCallback(() => setLb(null), []);
  return (
    <>
      <Navbar />
      <main><Hero /><About /><Director /><Programs /><Why /><Facilities /><Admissions onOpen={setLb} /><Contact /></main>
      <Footer />
      <a href={SITE.waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="wa"><MessageCircle size={28} /></a>
      {lb && <Lightbox src={lb} onClose={close} />}
    </>
  );
}
