"use client";

import parse from "html-react-parser";
import { Messages } from "primereact/messages";
import React, { useEffect, useRef } from "react";

import { useGetLatestAnnouncementQuery } from "@/redux/hooks/apiHooks";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
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
    <div className="flex flex-column flex-grow-1 bg-beige">
      <Messages ref={msgs} />
      {children}
    </div>
  );
};

export default ProtectedLayout;
