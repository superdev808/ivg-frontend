"use client";

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import {
    useGetLatestAnnouncementQuery
} from "@/redux/hooks/apiHooks";
import parse from 'html-react-parser'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const msgs = useRef<Messages>(null);
    const { data } = useGetLatestAnnouncementQuery({});

    useEffect(() => {
        if (msgs.current && data?.content) {
            msgs.current.clear();
            msgs.current.show([
                {
                    sticky: true,
                    life: 1000,
                    severity: 'success',
                    closable: true,
                    content: (<div className='h-3rem w-full overflow-y-hidden'>{parse(data?.content)}</div>)
                }
            ]);
        }
    }, [data]);
    return (
        <div className='nav-offset flex flex-column flex-grow-1'>
            <Messages ref={msgs} />
            {children}
        </div>
    );
}
