"use client";

import parse from "html-react-parser";
import React, { useEffect, useRef } from "react";

import Nav from "@/components/secure/calculators/Nav";
import Offering from "@/components/secure/calculators/Offering";
import PopularCalculators from "@/components/secure/calculators/PopularCalculators";
import Request from "@/components/secure/calculators/Request";
import Releases from "@/components/secure/calculators/Releases";
import { useGetLatestAnnouncementQuery } from "@/redux/hooks/apiHooks";
import { Messages } from "primereact/messages";

const CalculatorPage: React.FC = () => {
  const { data } = useGetLatestAnnouncementQuery({});

  const msgs = useRef<Messages>(null);

  useEffect(() => {
    if (msgs.current && data?.content) {
      msgs.current.clear();
      msgs.current.show([
        {
          sticky: true,
          life: 1000,
          severity: "success",
          closable: true,
          content: (
            <div className="h-3rem w-full overflow-y-hidden">
              {parse(data?.content)}
            </div>
          ),
        },
      ]);
    }
  }, [data]);

  return (
    <div className="flex flex-column flex-grow-1">
      <Messages ref={msgs} />
      <PopularCalculators />
      <Nav />
      <Offering />
      <Releases />
      <Request />
    </div>
  );
};

export default CalculatorPage;
