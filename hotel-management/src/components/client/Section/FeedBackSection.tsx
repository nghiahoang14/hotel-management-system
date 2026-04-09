"use client";

import CardItem from "../Card/CardItem";



import 'swiper/css';
import 'swiper/css/pagination';
import BaseSwiper from "../Swiper/BaseSwiper";
import { useTranslations } from "next-intl";
export interface Feedback {
  id: string ;
  rate:number;
  title: string;
  description: string;
  customer: string;
  country:string
}


const feedbacks: Feedback[] = [
  {
    id: "1",
    title: "Khách sạn tuyệt vời giữa lòng thủ đô ",
    description: "Đây là khách sạn yêu thích của tôi mỗi lần đến Hà Nội. Phòng nghỉ lúc nào cũng sạch sẽ, dịch vụ tốt và nhân viên chu đáo. Bữa trưa và tối ở đây cũng rất ngon.",
    customer:"Satoshi K ",
    rate:5,
    country:"Nhật Bản",
  },
  {
    id: "2",
    title: "Cạnh đẹp và dịch vụ tốt ",
    description: "Khách sạn Hà Nội có cảnh hồ đẹp,đội ngũ nhân viên thân thiện và luôn hỗ trợ nhiệt tình.Chắc chắn tôi sẽ còn quay lại đây lần nữa!",
    customer:"Linh N ",
    rate:5,
    country:"Việt Nam",
  },
  {
    id: "3",
    title: "Ẩm thực chuẩn vị Trung Hoa ",
    description: "Nhà hàng ẩm thực Trung Hoa của khách sạn thực sự rất tuyệt vời. Tôi đặc biệt ấn tượng với những món dimsum ở đây, một trong những món Dimsum ngon nhất mà tôi từng thử!",
    customer:"Ryan H ",
    rate:5,
    country:"Singapore",
  },
  {
    id: "4",
    title: "Nhân viên chu đáo và tận tâm ",
    description: "Điều tôi ấn tượng nhất là sự thân thiện và nồng nhiệt của các bạn nhân viên.Từ lễ tân đến nhân viên hành lý và buồng phòng ,ai cũng rất nhiệt tình và chuyên nghiệp. ",
    customer:"Joanna C ",
    rate:5,
    country:"Mỹ",
  },
 {
    id: "5",
    title: "Hoàn hảo cho doanh nghiệp ",
    description: "Tôi luôn lựa chọn khách sạn này là điểm dừng chân mỗi lần đi công tác ở Hà Nội. Phòng hội nghị ở đây rất ổn để tổ chức các sự kiện lớn nhỏ, dịch vụ thì tận tình và chu đáo.",
    customer:"Huy T ",
    rate:5,
    country:"Việt Nam",
  },
  {
    id: "6",
    title: "Trải nghiệm đáng nhớ ",
    description: "Cảnh hồ rất thư giãn, buffet sáng tuyệt vời và nhân viên thì rất chu đáo, sẵn sàng hỗ trợ để đảm bảo chúng tôi có đầy đủ mọi thứ mà chúng tôi cần.",
    customer:"Michael T ",
    rate:5,
    country:"Singapore",
  },
  
  
 
];

export const FeedbackSection = () => {
  const t = useTranslations("feedback");
    return(
        <>
          <section className=" px-4 text-center mt-[100px] mb-[30px]">
        <h3 className="mb-8 text-[50px] font-serif-raleway leading-tight ">{t("title")}</h3>

      <div className="relative mt-[40px]">
       <BaseSwiper
  data={feedbacks}
  slidesPerView={4}
  spaceBetween={30}
  freeMode
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  pagination
  navigation={{
    prevClass: "prevBtnSpecialEvent",
    nextClass: "nextBtnSpecialEvent",
  }}
 
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  }}
  renderSlide={(item,index) => (
    <CardItem
    _id={item.id}
      title={item.title}
      description={item.description}
      variant="feedback"
      customer={item.customer}
      country={item.country}
      rate={item.rate}
    />
  )}
/>

      </div>
      </section>
        </>
    )
}