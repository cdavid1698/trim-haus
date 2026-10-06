import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book a chair",
  description: "Book a haircut, shave or facial at Trim Haus Gents Salon, Al Ain. Pick a service, barber and time, then send it on WhatsApp.",
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const params = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  return <BookingFlow initialService={one(params.service)} initialBarber={one(params.barber)} />;
}
