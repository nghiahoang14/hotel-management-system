"use client"
import Image from "next/image"
import { FollowSection } from "../Section/FollowSection"

import { useParams } from "next/navigation"
import { ViewMore } from "./ViewMore"
import { Facilities } from "@/types/facilities"


type Props={
    facility:Facilities
    id:string
    facilities:Facilities[]
}
export const FacilitiesDetail=({facility,id,facilities}:Props)=>{
     const { locale } = useParams<{ locale: string }>();
    const otherFacilities = facilities.filter((f) => f._id.toString() !== id);
    return(
        <>
        {/* content */}
              <div className="container mx-auto px-12 mt-[100px]">
                <div className="flex items-center gap-20">
              
                  <Image
                    src={facility?.image[0] }
                    width={450}
                    height={600}
                    alt="image"
                    className="object-cover"
                  />
               
                <div>
                  <h3 className="text-[50px] font-serif-raleway mb-6">{facility?.title}</h3>
                  <p className="text-[16px] leading-snug tracking-widest mb-6">{facility?.description}</p>
                  <span className="uppercase font-bold block text-[16px] py-4">Giờ mở cửa:</span>
                  <p className="tracking-wide text-[16px]"> • {facility?.openHours}</p>
                </div>
                </div>
              </div>
              {/* image */}
              <FollowSection isHome={false}/>
              {/* view more */}
             <ViewMore data={otherFacilities } />
        </>
    )
}