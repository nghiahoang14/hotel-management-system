import { useTranslations } from "next-intl";

type FollowSectionProps = {
  isHome?:boolean;
  isDiningPage?:boolean
};

export const FollowSection = ({isHome,isDiningPage}:FollowSectionProps) => {
  const t = useTranslations("follow");
  return (
    <section className="mt-[100px]">
      {isHome ??(

      <div className="text-center mb-10">
        <h3 className="text-[50px] font-serif-raleway leading-tight">
          {t("title")}
        </h3>
      </div>
)}
      
      {/* IMAGES */}
      <div className="px-4">
        <div className="grid grid-cols-12 gap-3">

          {/* LEFT */}
          <div className="col-span-2 grid grid-rows-2 gap-3">
            <ImageBox src={isHome ?"/img-1.webp}":"https://hanoihotel.com.vn/wp-content/uploads/2024/12/Winners-Club-9.jpg"} />
            <ImageBox src={isHome?"/offer-img-5.jpg":"https://hanoihotel.com.vn/wp-content/uploads/2025/02/fixxx-1024x1024.jpg"} />
          </div>

          <div className="col-span-2 grid grid-rows-2 gap-3">
            <ImageBox src={isHome?"/img-2.jpg":"https://hanoihotel.com.vn/wp-content/uploads/2025/02/fixxx1-1024x1024.jpg"} />
            <ImageBox src={isHome?"/img-4.webp":"https://hanoihotel.com.vn/wp-content/uploads/2024/12/Night-Club-5.jpg"} />
          </div>

          {/* CENTER BIG */}
          <div className="col-span-4">
            <ImageBox src="/Hanoi_Hotel-img.jpg" large />
          </div>

          {/* RIGHT */}
          <div className="col-span-2 grid grid-rows-2 gap-3">
            <ImageBox src={isDiningPage?"https://hanoihotel.com.vn/wp-content/uploads/2024/12/Golden-Dragon-Restaurant_dimsum-5.jpg":"/img-5.webp"} />
            <ImageBox src={isDiningPage?"https://hanoihotel.com.vn/wp-content/uploads/2024/12/Dynasty_02.jpg":"/img-7.webp"} />
          </div>

          <div className="col-span-2 grid grid-rows-2 gap-3">
             <ImageBox src={isDiningPage?"https://hanoihotel.com.vn/wp-content/uploads/2024/12/Golden-Dragon-Restaurant-food-1.jpg":"/img-6.webp"} />
            <ImageBox src={isDiningPage?"https://hanoihotel.com.vn/wp-content/uploads/2024/11/dinner-1024x1024.png":"/img-8.webp"} />
          </div>

        </div>
      </div>
    </section>
  );
};
const ImageBox = ({
  src,
  large = false,
}: {
  src: string;
  large?: boolean;
}) => {
  return (
    <div
      className={`
        relative overflow-hidden 
        ${large ? "aspect-[1/1]" : "aspect-square"}
      `}
    >
      <img
        src={src}
        alt=""
        className="
          w-full h-full object-cover
          transition-transform duration-700 ease-out
          hover:scale-110 cursor-pointer
        "
      />
    </div>
  );
};
