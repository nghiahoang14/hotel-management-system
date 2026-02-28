export interface Dining {
  id: number;
  title: string;
  subtitle?:string;
  description:string;
  openHours: string[];
  hotline?:string
  image: string[];
  menu?: {
  label: string;
  url: string;
}[];

}

export const dinings: Dining[] = [
  {
    id: 1,
    title: "Nhà hàng Kim Long",
    subtitle:"Hương vị Hồng Kông đầy mê hoặc",
    description:
"Là nhà hàng Trung Hoa chuẩn vị nổi tiếng nhất tại Hà Nội, nơi các đầu bếp giàu kinh nghiệm luôn mang đến cho thực khách hương vị truyền thống đặc trưng nhất của những xửng Dimsum trứ danh cùng nhiều món ăn mang phong vị Hồng Kông đầy hấp dẫn. Ngoài ra, Nhà hàng Kim Long còn được biết đến là địa điểm hoàn hảo để tổ chức lễ cưới và các bữa tiệc sang trọng bởi không gian hiện đại, hài hòa kết hợp cùng phong cách phục vụ chuyên nghiệp, hứa hẹn mang lại cho Quý khách những món ăn đặc sắc, tinh tế và những khoảnh khắc đầy ấn tượng.",
    openHours: [
  "Bữa sáng: 05:30 – 10:00",
  "Bữa trưa: 11:30 – 14:00",
  "Bữa tối: 18:00 – 22:00",
],

     menu: [
      {
        label: "Dimsum Buffet menu",
        url: "https://info.hanoihotel.com.vn/DimsumBuffet2023.pdf",
      },
      {
        label: "Dimsum À la carte menu",
        url: "http://dimsum.hanoihotel.com.vn/AlacarteDimsum.pdf",
      },
      {
        label: "Golden Dragon À la carte menu",
        url: "https://drive.google.com/file/d/13uc27nR6f9RnQYDktzQeBWxcDbfJYd4q/view",
      },
    ],
    hotline: "0888 161 158",
    image: [
      "/offer-img-5.jpg",
            "https://hanoihotel.com.vn/wp-content/uploads/2024/11/Ban-sao-cua-Golden-Dragon-Restaurant-1-scaled.webp",
    ],
  },
  {
    id: 2,
    title: "Nhà hàng Mỹ Thực",
    subtitle:"Ẩm thực sang trọng và đẳng cấp",
    description:
    "Tọa lạc ngay bên Hồ Giảng Võ, nhà hàng Mỹ Thực (Hanoi Hotel Food Centre) luôn được tin chọn là địa điểm ẩm thực mang phong vị Hồng Kông bậc nhất của Thủ Đô Hà Nội. Với không gian thoáng đãng, cảnh quan lãng mạn bên hồ, thực khách thỏa sức tận hưởng các món ăn tinh tế từ các món truyền thống như mỳ sợi, sủi cảo, hoành thánh cho đến hải sản tươi sống cao cấp rất phong phú nhằm thoả mãn khẩu vị đa dạng của thực khách.",
    openHours: ["11:00 – 01:30 ngày hôm sau"],
    menu: [
      {
        label: "Hotpot menu",
        url: "https://drive.google.com/file/d/1g7_deHdsxlxd7rqhJL4WHN9cWISTNEJG/view",
      },
      {
        label: "Food Centre menu",
        url: "http://info.hanoihotel.com.vn/FC-Menu2023.pdf",
      },
    ],
    hotline: "0982 630 081",
    image: [
      "/Food-centre.jpg",
      "https://hanoihotel.com.vn/wp-content/uploads/2024/12/Food_Centre_02.jpg",
    ],
  },
  {
    id: 3,
    title: "Nhà hàng Hoàng Triều",
    subtitle:"Vẹn tròn hương vị",
    description:
"Với 6 phòng VIP riêng biệt được thiết kế đặc trưng theo từng Triều Đại, nhà hàng Hoàng Triều là một trong những nhà hàng sang trọng bậc nhất tại Hà Nội, nơi Quý khách được thưởng thức sự phong phú của các món Trung Hoa tuyệt hảo và các loại rượu quý hiếm. Không gian cùng phong cách phục vụ nơi đây luôn tạo cảm giác cho Quý khách như trong bữa tiệc của hoàng gia và chắc chắn đây là nơi thích hợp nhất để Quý khách tiếp đón các bậc yếu nhân tới họp mặt tại các tiệc trưa hoặc tiệc tối.",
    openHours:[
      "Bữa trưa: 11:30 – 14:00",
      "Bữa tối: 18:00 – 22:00",
    ],
     menu: [
      {
        label: "Dynasty Restaurant menu",
        url: "http://alacarte.hanoihotel.com.vn/ALaCarte.pdf",
      },
    ],
    
    image: [
      "/Dynasty.jpg",
      "https://hanoihotel.com.vn/wp-content/uploads/2024/12/dynasty_03.jpg",
    ],
  },
  {
    id: 4,
    title: "Lobby Bar",
    subtitle:"",
    description:
      "Là địa điểm lý tưởng để gặp gỡ bạn bè hay trò chuyện cùng đối tác, Lobby Bar tại Hanoi Hotel mang tới không gian thư giãn và riêng tư với đa dạng đồ uống và bánh ngọt dành cho Quý khách thưởng thức bên hồ Giảng Võ thơ mộng.",
    openHours:[ "07:00 – 23:00"],
   
    
    image: [
      "/Lobby-Bar.jpg",
      "https://hanoihotel.com.vn/wp-content/uploads/2024/12/banner-Lobby-Bar.jpg",
    ],
  },

  

  

  
];
