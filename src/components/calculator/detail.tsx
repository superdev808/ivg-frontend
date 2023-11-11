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
//   const [previewData, setPreviewData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!props.url) {
//         return;
//       }
//       try {
//         const response = await fetch(props.url);
//         const data = await response.text();
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(data, "text/html");
//         const title = doc.querySelector("title")?.textContent || "";
//         const description =
//           doc
//             .querySelector('meta[name="description"]')
//             ?.getAttribute("content") || "";
//         const image =
//           doc
//             .querySelector('meta[property="og:image"]')
//             ?.getAttribute("content") || "";

//         setPreviewData({ title, description, image });
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [props.url]);

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
