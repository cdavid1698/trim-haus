import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary, isLocale } from "@/content/i18n";
import { site } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).legal.termsTitle } : {};
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).legal;

  if (lang === "ar") {
    return (
      <LegalPage title={t.termsTitle} notice={t.notice}>
        <h2>الحجوزات</h2>
        <p>
          يتم تأكيد الحجز عندما يرد صالون تريم هاوس للرجال على رسالتك في واتساب. إذا تأخرت أو لم تتمكن من الحضور، يرجى إبلاغنا في
          أقرب وقت لنتيح الكرسي لعميل آخر.
        </p>
        <h2>الأسعار</h2>
        <p>الأسعار بالدرهم الإماراتي وتُدفع في المحل. قد تتغير الأسعار، ويُعتمد السعر المعروض في المحل.</p>
        <h2>الزيارة دون موعد</h2>
        <p>نرحب بالزيارة دون موعد خلال ساعات العمل حسب توفر الكراسي.</p>
      </LegalPage>
    );
  }

  return (
    <LegalPage title={t.termsTitle} notice={t.notice}>
      <h2>Bookings</h2>
      <p>
        A booking is confirmed once {site.name} replies to your WhatsApp message. If you are running late or can&apos;t make it,
        please let us know as early as you can so we can offer the chair to someone else.
      </p>
      <h2>Prices</h2>
      <p>Prices are in UAE dirhams (AED) and are paid in the shop. Prices may change; the price in the shop applies.</p>
      <h2>Walk-ins</h2>
      <p>Walk-ins are welcome during opening hours, subject to availability.</p>
    </LegalPage>
  );
}
