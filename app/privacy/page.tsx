import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This policy explains how {site.name} handles personal information shared through this website.
      </p>
      <h2>What we collect</h2>
      <p>
        The booking form does not send anything to us. When you choose to send a booking on WhatsApp, the message you
        send and your WhatsApp number are shared with us through WhatsApp. We use them only to arrange your appointment.
      </p>
      <h2>Offers list</h2>
      <p>
        If you join our offers list, we use your mobile number to send occasional promotions on WhatsApp. Reply STOP at any
        time to leave.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about your information: call {site.phone}.
      </p>
    </LegalPage>
  );
}
