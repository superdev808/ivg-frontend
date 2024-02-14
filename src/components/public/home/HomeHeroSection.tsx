import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hooks/hooks";

import { HeroSection } from "../shared/HeroSection";

export const HomeHeroSection = () => {
  const router = useRouter();

  const { authenticated } = useAppSelector((state) => state.auth);

  const handleJoin = () => {
    router.push("/register");
  };

  return (
    <HeroSection
      title="High Quality Patient Care At Your Fingertips"
      cta={
        !authenticated
          ? { label: "Join for FREE", onClick: handleJoin }
          : undefined
      }
      image={{ src: "/images/home/landing-anaytics.png" }}
    />
  );
};
