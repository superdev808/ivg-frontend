"use client";

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const msgs = useRef<Messages>(null);

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                {
                    sticky: true,
                    life: 1000,
                    severity: 'success',
                    closable: true,
                    content: (
                        <>
                            <div className="ml-4">This is the announcement banner ad</div>
                        </>
                    )
                }
            ]);
        }
    });
    return (
        <div className='nav-offset flex-grow-1'>
            {/* <Messages ref={msgs} /> */}
            {children}
        </div>
    );
}
