'use client';

import React from "react";
import styles from "./page.module.scss";
import { ContactComponent } from "@/components/shared/Contact";


export default function ContactPage() {

    return <>
        <div  className="flex flex-column ">
            
            <ContactComponent  />

        </div>

  
    </>
}
