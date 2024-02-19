import Link from "next/link";

import { CTASection } from "../shared/CTASection";

export const ContactCTASection = () => (
  <CTASection
    text={
      <>
        Request an additional Calculator or feature&nbsp;
        <Link href="/contact">
          <span className="font-bold text-primary underline">here</span>
        </Link>
        .
      </>
    }
    title="What are we missing?"
  />
);
