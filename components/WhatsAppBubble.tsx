import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/**
 * Signature element: a WhatsApp chat preview showing the exact message the customer will send.
 * Each line animates in as it appears, so the message visibly writes itself.
 */
export function WhatsAppBubble({ message, caption, lang }: { message: string; caption?: string; lang: Locale }) {
  const t = getDictionary(lang);
  const lines = message.split("\n");
  return (
    <figure className="overflow-hidden rounded-lg bg-[#efeae2] shadow-sm ring-1 ring-black/10">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
        <span className="grid size-9 place-items-center rounded-full bg-onyx text-sm font-semibold text-gold" aria-hidden dir="ltr">
          TH
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{t.common.businessName}</span>
          <span className="block text-xs text-white/80" dir="ltr">
            {site.phone}
          </span>
        </span>
        <WhatsAppIcon className="ms-auto size-5 text-white/90" />
      </div>
      <div className="px-4 pt-5 pb-4">
        <div className="bubble ms-auto max-w-[19rem] px-3.5 py-2.5 text-[0.95rem] leading-relaxed" aria-live="polite">
          {lines.map((line, i) => (
            <p key={`${i}-${line}`} className={i > 0 ? "line-in" : undefined}>
              {line}
            </p>
          ))}
          <p className="mt-1 text-end text-[0.7rem] text-[#4d5a62]">{t.book.readyToSend}</p>
        </div>
      </div>
      {caption && <figcaption className="border-t border-black/5 bg-white/60 px-4 py-2.5 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
