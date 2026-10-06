import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <h2>Bookings</h2>
      <p>
        A booking is confirmed once {site.name} replies to your WhatsApp message. If you are running late or can&apos;t
        make it, please let us know as early as you can so we can offer the chair to someone else.
      </p>
      <h2>Prices</h2>
      <p>Prices are in UAE dirhams (AED) and are paid in the shop. Prices may change; the price in the shop applies.</p>
      <h2>Walk-ins</h2>
      <p>Walk-ins are welcome during opening hours, subject to availability.</p>
    </LegalPage>
  );
}
