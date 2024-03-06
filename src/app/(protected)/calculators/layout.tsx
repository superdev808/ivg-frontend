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
                    closable: false,
                    content: (
                        <>
                            <Image alt="logo" src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" width="32" height='32' />
                            <div className="ml-4">This is the announcement banner ad</div>
                        </>
                    )
                },
                // { sticky: true, life: 2000, severity: 'info', summary: 'Info', detail: 'Message Content', closable: false },
                // { sticky: true, life: 3000, severity: 'warn', summary: 'Warning', detail: 'Message Content', closable: false },
                // { sticky: true, life: 4000, severity: 'error', summary: 'Error', detail: 'Message Content', closable: false }
            ]);
        }
    });
    return (
        <div className='nav-offset'>
            <Messages ref={msgs} />
            {children}
        </div>
    );
}
