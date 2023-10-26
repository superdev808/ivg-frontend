import React from "react";
import { Card } from "primereact/card";
import { Image } from 'primereact/image';

interface DetailViewProps {
    img?: string | null;
    url?: string;
    text?: string;
}

export default function DetailView(props: DetailViewProps) {
    return <Card className="w-12 mt-4 py-2 border-round bg-white">
        <div className="flex flex-column align-items-center">
            {props.img && <Image src={`/images/${props.img}`} alt="Image" width="150" />}
            {props.url && <a href={props.url} target="_blank" rel="noopener noreferrer">Detail View</a>}
            {props.text && props.text}
        </div>
    </Card>
}