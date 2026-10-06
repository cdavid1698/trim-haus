import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary, isLocale } from "@/content/i18n";
import { site } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { title: getDictionary(lang).legal.privacyTitle } : {};
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang).legal;
  const phone = <span dir="ltr">{site.phone}</span>;

  if (lang === "ar") {
    return (
      <LegalPage title={t.privacyTitle} notice={t.notice}>
        <p>توضح هذه السياسة كيف يتعامل صالون تريم هاوس للرجال مع المعلومات الشخصية التي تتم مشاركتها عبر هذا الموقع.</p>
        <h2>ما الذي نجمعه</h2>
        <p>
          نموذج الحجز لا يرسل إلينا أي بيانات. عندما تختار إرسال الحجز عبر واتساب، تصلنا رسالتك ورقم واتساب الخاص بك من خلال
          واتساب، ونستخدمهما فقط لترتيب موعدك.
        </p>
        <h2>قائمة العروض</h2>
        <p>إذا اشتركت في قائمة العروض، نستخدم رقم هاتفك لإرسال عروض بين حين وآخر عبر واتساب. أرسل «إلغاء» في أي وقت لإلغاء الاشتراك.</p>
        <h2>التواصل</h2>
        <p>لأي استفسار عن بياناتك: اتصل على {phone}.</p>
      </LegalPage>
    );
  }

  return (
    <LegalPage title={t.privacyTitle} notice={t.notice}>
      <p>This policy explains how {site.name} handles personal information shared through this website.</p>
      <h2>What we collect</h2>
      <p>
        The booking form does not send anything to us. When you choose to send a booking on WhatsApp, the message you send and
        your WhatsApp number are shared with us through WhatsApp. We use them only to arrange your appointment.
      </p>
      <h2>Offers list</h2>
      <p>
        If you join our offers list, we use your mobile number to send occasional promotions on WhatsApp. Reply STOP at any time
        to leave.
      </p>
      <h2>Contact</h2>
      <p>Questions about your information: call {phone}.</p>
    </LegalPage>
  );
}
