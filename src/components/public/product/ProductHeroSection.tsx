import { useRouter } from "next/navigation";

import { HeroSection } from "../shared/HeroSection";

export const ProductHeroSection = () => {
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
      image={{ src: "/images/common/elephant.svg", hideOnMobile: true }}
    />
  );
};
