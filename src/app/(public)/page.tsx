"use client";

// Sections
import { HomeContentSection } from "@/components/public/home/HomeContentSection";
import { HomeHeroSection } from "@/components/public/home/HomeHeroSection";

export default function Index() {
  return (
    <>
      <HomeHeroSection />
      <HomeContentSection />
    </>
  );
}
