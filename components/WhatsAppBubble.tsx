import { site } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/**
 * Signature element: a WhatsApp chat preview showing the exact message the customer will send.
 * Each line animates in as it appears, so the message visibly writes itself.
 */
export function WhatsAppBubble({ message, caption }: { message: string; caption?: string }) {
  const lines = message.split("\n");
  return (
    <figure className="overflow-hidden rounded-lg bg-[#efeae2] shadow-sm ring-1 ring-black/10">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
        <span className="grid size-9 place-items-center rounded-full bg-onyx text-sm font-semibold text-gold" aria-hidden>
          TH
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{site.name}</span>
          <span className="block text-xs text-white/80">{site.phone}</span>
        </span>
        <WhatsAppIcon className="ml-auto size-5 text-white/90" />
      </div>
      <div className="px-4 pt-5 pb-4">
        <div className="bubble ml-auto max-w-[19rem] px-3.5 py-2.5 text-[0.95rem] leading-relaxed" aria-live="polite">
          {lines.map((line, i) => (
            <p key={`${i}-${line}`} className={i > 0 ? "line-in" : undefined}>
              {line}
            </p>
          ))}
          <p className="mt-1 text-right text-[0.7rem] text-[#4d5a62]">ready to send</p>
        </div>
      </div>
      {caption && <figcaption className="border-t border-black/5 bg-white/60 px-4 py-2.5 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
