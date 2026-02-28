interface Room {
  id: number;
  name: string;
  slug?:string;
  description:string;
  bed: string;
  people: string;
  size: string;
  view: string;
  image: string[];
  amentities: string[];
}

 export const rooms: Room[] = [
  {
    id: 1,
    name: "Premium Executive Suite",
    slug:"Premium Executive Suite",
    description:"Trải nghiệm sự sang trọng tuyệt đối khi lưu trú tại hạng phòng Premium Executive Suite hướng ra hồ Giảng Võ thơ mộng. Với thiết kế mang phong cách nhã nhặn, Premium Executive Suite nổi bật với phòng khách riêng biệt, nội thất tinh tế cùng các tiên nghi hiện đại như thiết bị vệ sinh thông minh (washlet), lý tưởng cho bất kỳ vị khách nào đang tìm kiếm nơi nghỉ dưỡng thư thái và đẳng cấp tại thủ đô.",
    bed: "Giường King / 2 Giường đơn",
    people: "2 Người lớn & 1 Trẻ em",
    size: "50 m²",
    view: "Hướng hồ ",
    image:[ "/Premium-Executive-Suite-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2024/11/1-2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/1900-x-700-px-1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/2-2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/1200-x-800-px-2.png"],
    amentities:[
      "Tất cả các phòng không hút thuốc",
      "Phòng khách",
      "Bồn tắm, buồng tắm đứng, vòi sen và thiết bị vệ sinh thông minh",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 2,
    name: "Premium Deluxe Suite",
    slug: "Premium Deluxe Suite",

    description:"Tận hưởng sự thư giãn tuyệt đối với phòng Premium Deluxe Suite, nổi bật với không gian đậm nét đương đại cùng phòng khách tiện nghi, thanh lịch với các trang thiết bị tiên tiến và quang cảnh cảnh hồ Giảng Võ đầy ngoạn mục, để lại cho Quý khách những trải nghiệm đáng nhớ khi lưu trú tại Khách sạn Hà Nội.",
    bed: "Giường King",
    people: "2 Người lớn & 1 Trẻ em",
    size: "40 m²",
    view: "Hướng hồ",
    image: ["/Premium-Deluxe-Suite-img.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/PDS-900-1200-1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/PDS-1900-700-1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/PDS-900-1200-2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/PDS-1200-800-1.png"],
    amentities:[
      "Tất cả các phòng không hút thuốc",
      "Phòng khách",
      "Bồn tắm, buồng tắm đứng, vòi sen và thiết bị vệ sinh thông minh",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 3,
    name: "Junior Suite",
    slug: "Junior Suite",

    description:"Phòng Junior Suite là sự cân bằng hoàn hảo giữa yếu tố thẩm mỹ đương thời và sự tiện nghi, bao gồm phòng khách riêng biệt với đầy đủ tiện ích, phòng ngủ rộng rãi và nội thất hiện đại, đáp ứng trọn vẹn mọi nhu cầu lưu trú dù là nghỉ dưỡng hay những chuyến công tác dài ngày.",
    bed: "Giường King/ Giường Queen",
    people: "2 Người lớn & 1 Trẻ em",
    size: "39 m²",
    view: "Hướng thành phố",
    image:[ "/Junior-Suite-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2024/11/jrsut1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/jrsut2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/jrsut3.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/jrsut4.png"],
    amentities:[
      "Tất cả các phòng không hút thuốc",
      "Phòng khách",
      "Bồn tắm và vòi sen ",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 4,
    name: "Premium Deluxe",
    slug:"Premium Deluxe",
    description:"Với tầm nhìn tuyệt đẹp hướng ra hồ Giảng Võ thơ mộng và phố phường nhộn nhịp, phòng Premium Deluxe được thiết kế theo phong cách tối giản và hiện đại, trang bị đầy đủ những tiện nghi tiên tiến như thiết bị vệ sinh thông minh (washlet), mang lại cho Quý khách kỳ nghỉ dưỡng tinh tế và hoàn hảo nhất.",
    bed: "Giường King/ 2 Giường đơn",
    people: "2 Người lớn & 1 Trẻ em",
    size: "28 m²",
    view: "Hướng hồ/Hướng thành phố",
    image: ["/Premium-Deluxe-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prmdlx1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prmdlx2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prmdlx3.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/PDS-1200-800.png"],
    amentities:[
      "Tất cả các phòng không hút thuốc",
      "Bồn tắm, vòi sen và thiết bị vệ sinh thông minh",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 5,
    name: " Deluxe Suite",
    slug: " Deluxe Suite",

    description:"Tận hưởng sự thư giãn tuyệt đối với phòng Premium Deluxe Suite, nổi bật với không gian đậm nét đương đại cùng phòng khách tiện nghi, thanh lịch với các trang thiết bị tiên tiến và quang cảnh cảnh hồ Giảng Võ đầy ngoạn mục, để lại cho Quý khách những trải nghiệm đáng nhớ khi lưu trú tại Khách sạn Hà Nội.",
    bed: "Giường King ",
    people: "2 Người lớn & 1 Trẻ em",
    size: "40 m²",
    view: "Hướng hồ",
    image: ["/Deluxe-Suite-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2024/11/1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/DS-1900-x-700-px.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/1200-x-800-px-1.png"],
    amentities:[
      "Tất cả các phòng không hút thuốc",
      "Phòng khách",
      "Bồn tắm, buồng tắm đứng, vòi sen và thiết bị vệ sinh thông minh",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 6,
    name: " Premium Room",
    slug: " Premium Room",

    description:"Tận hưởng kỳ nghỉ đáng nhớ với khung cảnh thành phố đầy sôi động từ phòng Premium Room của Khách sạn Hà Nội. Không gian trang nhã, thanh lịch cùng giường ngủ êm ái và các trang thiết bị hiện đại sẽ mang đến trải nghiệm khó quên dành cho những ai đang tìm kiếm sự thoải mái và tiện nghi khi lưu trú tại thủ đô.",
    bed: "Giường King/ Giường Queen/ 2 Giường đơn",
    people: "2 Người lớn & 1 Trẻ em",
    size: "24 - 28 m²",
    view: "Hướng thành phố",
    image:[ "/Premium-Room-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prm1.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prm2.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prm3.png","https://hanoihotel.com.vn/wp-content/uploads/2024/11/prm4.png"],
    amentities:[
      "Phòng hút thuốc hoặc không hút thuốc",
      "Bồn tắm và vòi sen ",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 7,
    name: " Executive Suite",
    slug: " Executive Suite",

    description:"Tối giản nhưng đầy tinh tế, Phòng Executive Suite sở hữu phòng khách sang trọng, bàn làm việc trang nhã và phòng ngủ êm ái, đem đến không gian hoàn hảo để thư giãn sau một ngày dài làm việc hay khám phá nhịp sống sôi động của thành phố. ",
    bed: "Giường King",
    people: "2 Người lớn & 1 Trẻ em",
    size: "50 m²",
    view: "Hướng hồ",
    image: ["/Executive-Suite-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2018/09/1-1536x2048.jpg","https://hanoihotel.com.vn/wp-content/uploads/2018/09/1900-x-700-px.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/2-1638x2048.jpg","https://hanoihotel.com.vn/wp-content/uploads/2018/09/1200-x-800-px.png"],
    amentities:[
      "Phòng hút thuốc hoặc không hút thuốc",
      "Bồn tắm và vòi sen ",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 8,
    name: " Deluxe Room",
    slug: " Deluxe Room",

    description:"Trải nghiệm không gian tinh tế của hạng phòng Deluxe Room với thiết kế đậm chất cổ điển, hòa quyện cùng tông màu ấm áp và hệ thống nội thất tiêu chuẩn. Sở hữu tầm nhìn tuyệt đẹp hướng ra hồ Giảng Võ yên bình và phố phường sầm uất, Deluxe Room là nơi lưu giữ nét hoài niệm độc đáo giữa lòng thủ đô.",
    bed: "Giường King/ 2 Giường đơn",
    people: "2 Người lớn & 1 Trẻ em",
    size: "28 m²",
    view: "Hướng hồ/ Hướng thành phố",
    image:[ "/Deluxe-Room-img.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/dlx1.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/1900-700.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/dlx-1200-800-1.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/dlx-1200-800.png"],
    amentities:[
      "Phòng hút thuốc hoặc không hút thuốc",
      "Bồn tắm và vòi sen ",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
  {
    id: 9,
    name: "Family Room",
    slug: "Family Room",

    description:"Family Room mang đến sự ấm cúng với không gian rộng rãi gồm hai phòng ngủ riêng biệt, được trang bị đầy đủ các tiện nghi. Đây sẽ là lựa chọn hoàn hảo dành cho các gia đình để tận hưởng kỳ nghỉ dưỡng thư thái và những giây phút yên bình bên nhau ngay giữa lòng Hà Nội.",
    bed: "Giường Queen & 2 Giường đơn",
    people: "4 Người",
    size: "50 m²",
    view: "Hướng thành phố",
    image: ["/Family-Room-img.webp","https://hanoihotel.com.vn/wp-content/uploads/2018/09/1.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/FR-1900-x-700-px.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/2.png","https://hanoihotel.com.vn/wp-content/uploads/2018/09/FR-1200x800-1.jpg"],
    amentities:[
      "Bồn tắm và vòi sen ",
      "Máy sấy tóc",
      "Áo choàng tắm",
      "Dép đi trong nhà",
      "Tủ quần áo",
      "TV & kênh truyền hình cáp",
      "Điện thoại IDD",
      "Wifi miễn phí trong tất cả các phòng",
      "Bàn làm việc",
      "Minibar",
      "Trà và cà phê",
      "Ấm siêu tốc",
      "Két an toàn",
      "2 chai nước khoáng hàng ngày"

    ]
  },
];