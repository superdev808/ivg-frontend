import { HeroSection } from "../shared/HeroSection";

export const WorkflowsHeroSection = () => (
  <HeroSection
    title="Workflows"
    subtitle="Ivory Guide workflows streamline patient care through step-by-step
				guidance and recommendations."
    cta={{ label: "Request More Information" }}
    image={{
      src: "/images/workflows/product/workflow-product.svg",
      width: "75%",
      height: "75%",
    }}
  />
);
