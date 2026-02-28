import { Header } from "@/src/components/client/layouts/Header";
import { AmenitiesSection } from "@/src/components/client/Section/AmenitiesSection";
import { ConferenceSection } from "@/src/components/client/Section/ConferenceSection";
import DiningSection from "@/src/components/client/Section/DiningSection";

import { FeedbackSection } from "@/src/components/client/Section/FeedBackSection";
import { FollowSection } from "@/src/components/client/Section/FollowSection";
import OfferSection from "@/src/components/client/Section/OfferSection";
import OverViewSection from "@/src/components/client/Section/OverViewSection";
import { RoomSection } from "@/src/components/client/Section/RoomSection";



export const metadata = {
  title: "Trang chủ - Hanoi Hotel",

};



export default function Home() {
 

  return (
    <>
    <Header  bookingForm images={[
          "/Hanoi_Hotel-img.jpg",
          "/Executive-Suite-img.webp",
          "/Premium-Deluxe-img.webp",
        ]}  title = "Hanoi Hotel"
  subtitle = "Live Oriental Heritage"/>
    <OverViewSection/>
    <OfferSection/>
    <RoomSection/>
    <DiningSection/>
    <ConferenceSection/>
    <FollowSection/>
    <AmenitiesSection/>
    <FeedbackSection/>
    </>
  );
}
