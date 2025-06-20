import AboutSection from "./pages/Home/AboutSection";
import HeroSection from "./pages/Home/HeroSection";
import NewThisSection from "./pages/Home/NewThisSection";

export default function Home() {

  return (
    <div className="pt-3 xm:pt-10 pl-4.5 flex flex-col gap-24  xm:px-14">
      <HeroSection/>
      <NewThisSection/>
      <AboutSection/>
    </div>
  );
}
