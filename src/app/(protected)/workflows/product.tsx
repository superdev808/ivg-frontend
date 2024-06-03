import React from "react";
import { Button } from "primereact/button";
import { WorkflowsHeroSection } from "@/components/public/workflows/WorkflowsHeroSection";


import classNames from "classnames/bind";
import styles from "../page.module.scss";
import { WorkflowsHowSection } from "@/components/public/workflows/WorkflowsHowSection";
import { WorkflowsAdvantageSection } from "@/components/public/workflows/WorkflowsAdvantageSection";
import { WorkflowsCTASection } from "@/components/public/workflows/WorkflowsCTASection";
import FooterExtended from "@/components/layout/footer/FooterExtended";


export default function WorkflowProduct() {
  return (
    <>
      <WorkflowsHeroSection/>
      <WorkflowsHowSection/>
      <WorkflowsAdvantageSection/>
      <WorkflowsCTASection/>
      <FooterExtended/> 
  
    </>
  );
}
