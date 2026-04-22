import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
    
      {
          protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dn63kxzvu/**", 
      },

    
      {
        protocol: "https",
        hostname: "hanoihotel.com.vn",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
