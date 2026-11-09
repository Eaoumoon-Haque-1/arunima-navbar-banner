import AboutSection from "../../components/Home/About/AboutSection";
import BeMemberSection from "../../components/Home/BeMemberSection/BeMemberSection";
import CourseMapSection from "../../components/Home/CourseMapSection/CourseMapSection";
import ExperienceSection from "../../components/Home/ExperienceSection/ExperienceSection";
import GuestReflections from "../../components/Home/GuestReflection/GuestReflection";
import HeroCarousel from "../../components/Home/HeroCarousel/HeroCarousel";


const Home = () => {
  return (
    <main className="w-full pt-[86px] lg:pt-[96px]">
        
        <HeroCarousel />
        <AboutSection />
        <CourseMapSection />
        <ExperienceSection />
        <GuestReflections />
        <BeMemberSection />
        
    </main>
  );
};

export default Home;