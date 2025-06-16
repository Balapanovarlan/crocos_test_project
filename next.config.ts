import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // если у вас нет других опций — можно опустить тип явно,
  // но так он будет подсказывать в IDE
  // async rewrites() {
  //   return [
  //     {
  //       source: "/product/:path*",
  //       destination: "http://127.0.0.1:8022/product/:path*",
  //     },
  //     // при необходимости можно ещё правила добавить
  //   ];
  // },
};

export default nextConfig;
