import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import RecentActivity from "../components/home/RecentActivity";
import HowItWorks from "../components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <RecentActivity />
      <HowItWorks />
      <Footer />
    </>
  );
}