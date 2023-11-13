import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";

interface DetailViewOption {
  label: string;
  value: string;
}

interface DetailViewProps {
  url?: string;
  name?: DetailViewOption;
  text?: DetailViewOption;
}

export default function DetailView(props: DetailViewProps) {
  return (
    <Card className="w-12 mt-4 py-2 border-round bg-white">
      <div className="grid">
        {props.name && (
          <>
            <div className="col-3 col-offset-1">{props.name.label}</div>
            <div className="col-8">{props.name.value}</div>
          </>
        )}
        {props.text && (
          <>
            <div className="col-3 col-offset-1">{props.text.label}</div>
            <div className="col-8">{props.text.value}</div>
          </>
        )}
        {props.url && (
          <>
            <div className="col-3 col-offset-1">Link To Purchase</div>
            <div className="col-8">
              <a href={props.url} target="_blank" rel="noopener noreferrer" style={{ overflowWrap: "break-word" }}>
                {props.url}
              </a>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
