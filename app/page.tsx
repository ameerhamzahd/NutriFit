import Banner from "@/components/Banner";
import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import Idea from "@/components/Idea";

export default function Home() {
  return (
    <div className="mx-auto justify-center">
      <Banner />
      <Idea />
      <Features />
      <FAQs />
    </div>
  );
}
