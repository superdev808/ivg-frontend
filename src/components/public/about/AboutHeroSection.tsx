import { useRouter } from "next/navigation";

import { HeroSection } from "../shared/HeroSection";

import styles from "./About.module.scss";

export const AboutHeroSection = () => {
  const router = useRouter();

  const handleRedirectToContactUs = () => {
    router.push("/contact");
  };

  return (
    <HeroSection
      title="Instantaneous Access To Trustworthy Clinical Recommendations"
      cta={{
        label: "Request more information",
        onClick: handleRedirectToContactUs,
      }}
      video={{
        src: "https://www.youtube.com/embed/JPx2v-QBwoQ?si=8AbMbjHZ3PnPSq-0 ",
        className: styles.video,
      }}
      light
    />
  );
};
