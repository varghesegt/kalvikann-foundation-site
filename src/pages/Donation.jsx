import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Smartphone,
  Banknote,
  QrCode,
  Sparkles,
  ArrowRight,
  IndianRupee,
  Copy,
  Check,
  ShieldCheck,
  FileCheck2,
  BadgeCheck,
  Share2,
} from "lucide-react";

// ⚠️ Replace with your real details
const ORG = {
  name: "Kalvikann Foundation",
  upiId: "example@upi",
  upiNote: "Donation for Kalvikann Foundation",
  accountName: "Kalvikann Foundation",
  accountNo: "1234567890",
  ifsc: "ABCD0123456",
  branch: "Chennai Main Branch",
  emailReceipt: "donations@kalvikann.org",
};

const PRESETS = [500, 1000, 2500, 5000, 10000];

function buildUpiLink({ upiId, name, note, amount }) {
  const params = new URLSearchParams();
  params.set("pa", upiId);
  if (name) params.set("pn", name);
  if (note) params.set("tn", note);
  params.set("cu", "INR");
  if (amount && Number(amount) > 0) params.set("am", String(Number(amount)));
  return `upi://pay?${params.toString()}`;
}

export default function Donation() {
  const reduced = useReducedMotion();
  const [amount, setAmount] = useState(1000);
  const [freq, setFreq] = useState("one"); // one | monthly
  const [copied, setCopied] = useState("");
  const [qrLoaded, setQrLoaded] = useState(false);

  const upiLink = useMemo(
    () => buildUpiLink({ upiId: ORG.upiId, name: ORG.name, note: ORG.upiNote, amount }),
    [amount]
  );

  const numericAmount = Number(amount) || 0;
  const validAmount = Number.isFinite(numericAmount) && numericAmount >= 1 && numericAmount <= 1000000;

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 1200);
    } catch {
      // ignore
    }
  };

  const share = async (text, url) => {
    try {
      if (navigator.share) {
        await navigator.share({ title: ORG.name, text, url });
      } else {
        await navigator.clipboard.writeText(url || text);
        setCopied("share");
        setTimeout(() => setCopied(""), 1500);
      }
    } catch {/* user dismissed */}
  };

  const orbA = reduced ? {} : { x: [0, 30, 0], y: [0, -30, 0] };
  const orbB = reduced ? {} : { x: [0, -30, 0], y: [0, 30, 0] };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      {/* Background mesh orbs */}
      <motion.div aria-hidden animate={orbA} transition={{ repeat: Infinity, duration: 14 }} className="pointer-events-none absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full bg-emerald-300/25 blur-[140px]" />
      <motion.div aria-hidden animate={orbB} transition={{ repeat: Infinity, duration: 18 }} className="pointer-events-none absolute -bottom-24 -right-24 h-[560px] w-[560px] rounded-full bg-sky-300/25 blur-[160px]" />

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-14 text-center md:pt-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-yellow-500" /> Your support powers real change
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[clamp(2rem,6vw,4rem)] font-extrabold leading-tight text-gray-900">
          Empower the future with your <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">donation</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="mx-auto mt-3 max-w-3xl text-[clamp(1rem,1.6vw,1.125rem)] text-gray-700">
          Your generosity fuels education, supports families, and strengthens communities. Every rupee counts.
        </motion.p>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[{ icon: FileCheck2, txt: "12A/80G Compliant" }, { icon: ShieldCheck, txt: "Secure & Private" }, { icon: BadgeCheck, txt: "Instant Receipt" }].map((b, i) => (
            <span key={b.txt + i} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
              {React.createElement(b.icon, { className: "h-4 w-4" })} {b.txt}
            </span>
          ))}
        </div>
      </section>

      {/* MAIN CARDS */}
      <section className="relative z-10 mx-auto max-w-6xl grid gap-6 px-6 pb-16 md:grid-cols-3">
        {/* Tier & Frequency */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
          <h3 className="text-lg font-semibold text-gray-900">Choose amount</h3>
          <p className="mt-1 text-sm text-gray-600">Pick a preset or enter a custom amount.</p>

          {/* Presets */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {PRESETS.map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition ${
                  amount === v
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-emerald-100 bg-white text-gray-700 hover:bg-emerald-50"
                }`}
              >
                ₹{v.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom */}
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-gray-50 px-3 py-2">
            <IndianRupee className="h-5 w-5 text-emerald-600" />
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          {!validAmount && (
            <div className="mt-1 text-xs font-medium text-rose-600">Enter a valid amount between ₹1 and ₹10,00,000.</div>
          )}

          {/* Frequency */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            {[
              { id: "one", label: "One‑time" },
              { id: "monthly", label: "Monthly" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFreq(f.id)}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition ${
                  freq === f.id ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 bg-white text-gray-700 hover:bg-sky-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {freq === "monthly" && (
            <p className="mt-2 text-xs text-gray-600">We’ll guide you to set up a standing instruction in your UPI app after the first payment.</p>
          )}
        </motion.div>

        {/* UPI & QR */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="flex flex-col items-center justify-between rounded-3xl border border-emerald-100 bg-white/80 p-6 text-center shadow-xl backdrop-blur">
          <div>
            <Smartphone className="mx-auto h-10 w-10 text-emerald-600" />
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Donate via UPI</h3>
            <p className="mt-1 text-sm text-gray-600">Works with any UPI app. Tap Pay or scan the QR.</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-1 font-mono text-sm text-gray-800">
              {ORG.upiId}
              <button
                type="button"
                onClick={() => copy(ORG.upiId, "upi")}
                className="ml-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-50"
              >
                {copied === "upi" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />} {copied === "upi" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <a
                href={validAmount ? upiLink : undefined}
                onClick={(e) => { if (!validAmount) e.preventDefault(); }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition ${validAmount ? "bg-gradient-to-r from-emerald-600 to-sky-600 hover:shadow-2xl" : "bg-gray-300 cursor-not-allowed"}`}
              >
                <Heart className="h-4 w-4" /> Pay ₹{validAmount ? Number(amount).toLocaleString() : "—"}
              </a>
              <button
                onClick={() => share(`Support ${ORG.name}`, upiLink)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4" /> {copied === "share" ? "Link Copied" : "Share Link"}
              </button>
            </div>
          </div>

          {/* QR */}
          <div className="mt-6 w-full">
            <div className="mx-auto grid max-w-[220px] place-items-center rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
              <div className="mb-1 text-xs font-medium text-gray-600">Scan to pay</div>
              <div className="relative">
                {!qrLoaded && <div className="absolute inset-0 grid place-items-center text-xs text-gray-500">Generating…</div>}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=220x220&margin=10`}
                  alt="UPI QR Code"
                  width={220}
                  height={220}
                  className={`rounded-md ${qrLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                  onLoad={() => setQrLoaded(true)}
                />
              </div>
              <div className="mt-2 text-[10px] text-gray-500">UPI: {ORG.upiId}</div>
            </div>
          </div>
        </motion.div>

        {/* Bank Transfer */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
          <h3 className="text-lg font-semibold text-gray-900">Bank transfer</h3>
          <p className="mt-1 text-sm text-gray-600">Prefer NEFT/IMPS? Use the details below.</p>

          <div className="mt-4 grid gap-2 text-sm">
            {[{ k: "Account Name", v: ORG.accountName, key: "accName" }, { k: "Account No.", v: ORG.accountNo, key: "accNo" }, { k: "IFSC", v: ORG.ifsc, key: "ifsc" }, { k: "Branch", v: ORG.branch, key: "branch" }].map((row) => (
              <div key={row.key} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <span className="font-medium text-gray-700">{row.k}</span>
                <span className="font-mono text-gray-800">{row.v}</span>
                <button onClick={() => copy(row.v, row.key)} className="ml-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-50">
                  {copied === row.key ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />} {copied === row.key ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs text-emerald-900">
            Include a remark like <span className="font-semibold">“{ORG.upiNote}”</span> in your transfer for faster reconciliation.
          </div>
        </motion.div>
      </section>

      {/* IMPACT STRIP */}
      <section className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-6 text-center text-sm md:text-base">
          {[
            { n: 500, label: "Students Supported" },
            { n: 200, label: "Families Uplifted" },
            { n: 50, label: "Community Projects" },
          ].map((s, i) => (
            <div key={s.label} className="rounded-2xl bg-white/10 p-5 shadow backdrop-blur">
              <div className="text-2xl font-extrabold md:text-3xl">{s.n}+ </div>
              <div className="text-emerald-50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RECEIPT + LEGAL */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h4 className="text-base font-semibold text-gray-900">Tax receipt & compliance</h4>
            <p className="mt-1 text-sm text-gray-700">
              Receipts are emailed automatically from <span className="font-mono">{ORG.emailReceipt}</span>. We are <span className="font-semibold">12A/80G compliant</span>.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h4 className="text-base font-semibold text-gray-900">Security & privacy</h4>
            <p className="mt-1 text-sm text-gray-700">UPI payments occur in your banking app. We do not store card or UPI PIN data.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold text-gray-900">
          Be the reason someone smiles today
        </motion.h2>
        <p className="mx-auto mt-2 max-w-2xl text-gray-700">Your support fuels our mission. Even small monthly gifts create outsized change.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={validAmount ? upiLink : undefined}
            onClick={(e) => { if (!validAmount) e.preventDefault(); }}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-xl transition ${validAmount ? "bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 hover:shadow-2xl" : "bg-gray-300 cursor-not-allowed"}`}
          >
            <Heart className="h-5 w-5" /> Donate via UPI <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
