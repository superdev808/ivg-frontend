"use client";

import React from "react";

import Nav from "@/components/secure/calculators/Nav";
import Offering from "@/components/secure/calculators/Offering";
import PopularCalculators from "@/components/secure/calculators/PopularCalculators";
import Request from "@/components/secure/calculators/Request";
import Releases from "@/components/secure/calculators/Releases";

const CalculatorPage: React.FC = () => {
  return (
    <>
      <PopularCalculators />
      <Nav />
      <Offering />
      <Releases />
      <Request />
    </>
  );
};

export default CalculatorPage;
