import { Header } from "@/src/components/client/layouts/Header";
import { ContactSection } from "@/src/components/client/Section/ContactSection";



export const metadata = {
  title: "Liên hệ - Hanoi Hotel",
};
export default async function ContactPage() {
 
  return (
    <>
      {/* HEADER */}
      <Header images={["/contact-img.webp"]} autoSlide={false} />

    <ContactSection/>
    </>
  );
}
