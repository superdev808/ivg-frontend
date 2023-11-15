import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { isUrl } from "@/helpers/util";
import { Image } from "primereact/image";

interface DetailViewOption {
  name: string;
  text: string;
}

interface DetailViewProps {
  fields?: Array<DetailViewOption>;
  data?: any;
}

export default function DetailView(props: DetailViewProps) {
  const { fields, data } = props;

  return (
    <Card className="w-12 mt-4 py-2 border-round bg-white">
      <div>
        {fields?.map((field) =>
          data[field.name] ? (
            <div key={field.name}  className="grid">
              <div className="col-3 col-offset-1">{field.text}</div>
              <div className="col-8">
                {isUrl(data[field.name]) ? (
                  <a
                    href={data[field.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ overflowWrap: "break-word" }}
                  >
                    {data[field.name]}
                  </a>
                ) : (
                  data[field.name]
                )}
              </div>
            </div>
          ) : null
        )}
        {data.image && <div className="grid">
            <div className="col-offset-4 col-8">
                <Image src={data.image} alt="output image" width="200px" />
            </div>
        </div>}
      </div>
    </Card>
  );
}
