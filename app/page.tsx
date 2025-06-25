'use client'
import { useQuery } from "@tanstack/react-query";
import AboutSection from "./pages/Home/AboutSection";
import HeroSection from "./pages/Home/HeroSection";
import NewThisSection from "./pages/Home/NewThisSection";
import { fetchAddToCart, fetchCart, fetchLogin } from "./utils/axios";

export default function Home() {
  // const loginData = {
  //   username: 'new_user',
  //   password: 'secret123',
  // };

  // const { 
  //   data: token, 
  //   isLoading: tokenIsLoading, 
  //   isError: tokenIsError 
  // } = useQuery({ 
  //   queryKey: ['login', loginData], 
  //   queryFn: () => fetchLogin(loginData) 
  // });

  // const { 
  //   data: cartData, 
  //   isLoading: cartIsLoading, 
  //   isError: cartIsError 
  // } = useQuery({
  //   queryKey: ['cart', token?.access],
  //   queryFn: () => token ? fetchCart(token.access) : Promise.resolve(null),
  //   enabled: !!token // Запрос выполнится только при наличии token
  // });

  // const { 
  //   data: infoCart, 
  //   isLoading: infoCartIsLoading, 
  //   isError: infoCartIsError 
  // } = useQuery({
  //   queryKey: ['info-cart', token?.access],
  //   queryFn: () => token ? fetchAddToCart(token.access) : Promise.resolve(null),
  //   enabled: !!token
  // });

  // // 2. Все условия рендеринга после хуков
  // if (tokenIsLoading || cartIsLoading || infoCartIsLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (tokenIsError || cartIsError || infoCartIsError) {
  //   return <p>Error</p>;
  // }

  // console.log({ token, cartData, infoCart });

  return (
    <div className="pt-3 xm:pt-10 pl-4.5 flex flex-col gap-24 xm:px-14">
      <HeroSection/>
      <NewThisSection/>
      <AboutSection/>
    </div>
  );
}