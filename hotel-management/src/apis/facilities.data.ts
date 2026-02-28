export interface Facilities {
  id: number;
  title: string;
  description:string
  image: string[];
  openHours?: string; 
}

 export const facilities: Facilities[] = [
  {
    id: 1,
    title: "Hanoi Night Club ",
    description:"Hanoi Night Club là một trong những câu lạc bộ giải trí nổi tiếng tại Hà Nội. Sở hữu quầy bar cùng hệ thống các phòng karaoke hiện đại, nơi đây sẽ đem đến cho Quý khách những giây phút thư giãn và đầy màu sắc với các vũ điệu nóng bỏng và âm nhạc sôi động. Quý khách sẽ trở thành ngôi sao ca nhạc với hơn 100.000 bài hát trong không gian giải trí đầy riêng tư và sang trọng của chúng tôi.",
    image: ["https://hanoihotel.com.vn/wp-content/uploads/2024/12/Night-Club.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/Night-Club-3-scaled.webp"],
    openHours:"06:30 – 02:00 ngày hôm sau"
  },
  {
    id: 2,
    title: "Winners’ Club ",
    description:"Winners’ Club là một trong số ít địa điểm cung cấp dịch vụ trò chơi điện tử có thưởng tại Hà Nội với các loại máy hiện đại và tiêu biểu như slot, roulette và baccarat. Nơi đây sẽ mang đến cho Quý khách sự giải trí thú vị và may mắn. Hãy đến với Winners’ Club, Quý khách sẽ trở thành Người Chiến Thắng!",
    image: ["https://hanoihotel.com.vn/wp-content/uploads/2024/12/Winners-Club-6.jpg","https://hanoihotel.com.vn/wp-content/uploads/2024/12/Winner-banner.png"],
    openHours:"Mở cửa 24 giờ"
  },
   {
    id: 3,
    title: "FIXX Spa ",
    description:"FIXX Spa mang đến cho Quý khách cảm giác thư giãn sau những ngày làm việc căng thẳng với không gian tiện nghi, hiện đại cùng những dịch vụ tốt nhất. Không chỉ có những kỹ thuật tiên tiến nhất về tắm hơi, chúng tôi còn có đội ngũ nhân viên giàu kinh nghiệm và được đào tạo chuyên nghiệp. Chúng tôi tin răng Quý khách sẽ rất hài lòng và thư giãn tuyệt đối khi đến với FIXX Spa.",
    image: ["https://hanoihotel.com.vn/wp-content/uploads/2024/12/spa.jpg","https://hanoihotel.com.vn/wp-content/uploads/2024/12/fixx-spa-banner.jpg"],
    openHours:"10:30 sáng – 00:00 ngày hôm sau"
  },
   {
    id: 4,
    title: "Trung tâm thể hình ",
    description:`Trung tâm thể hình là nơi Quý khách được thỏa sức rèn luyện, nâng cao sức khỏe và duy trì vóc dáng cân đối với hệ thống trang thiết bị hiện đại và đa dạng.\n

Trang thiết bị bao gồm:
Tạ cầm tay và tạ đòn
Giá đỡ squat đa năng
Thiết bị đẩy tạ và máy tập tạ toàn thân
Máy chạy bộ
Xe đạp thể dục
Máy tập đa năng và nhiều thiết bị khác`,
    image: ["https://hanoihotel.com.vn/wp-content/uploads/2024/12/Fitness.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/Ban-sao-cua-Gym-3.jpg"],
    openHours:"Mở cửa 24 giờ"
  },
   {
    id: 5,
    title: "Sân Tennis ",
    description:"Sân tennis của Khách sạn Hà Nội sở hữu khu vực thi đấu rộng rãi, thoáng mát cùng cơ sở vật chất tiêu chuẩn và đa dạng lựa chọn về ẩm thực ngay trong khuôn viên khách sạn sau những trận giao hữu.",
    image: ["https://hanoihotel.com.vn/wp-content/uploads/2024/12/Tennis-1.jpg","https://hanoihotel.com.vn/wp-content/uploads/2024/11/Ban-sao-cua-Tennis-1.jpg"],
    openHours:"09:00 – 22:00"
  },
];