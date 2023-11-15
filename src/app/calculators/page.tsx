'use client';
import React, { useMemo } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useGetCalculatorsQuery } from "@/redux/services/calculatorsApi";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "./page.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function CalculatorsPage() {

  const router = useRouter();

  const tabItems = [
    { label: "Scanbodies", value: 0 },
    { label: "Implant Drivers", value: 1 },
    { label: "Implant Screws", value: 2 },
    { label: "Crown Materials", value: 2 },
  ];

  return (
    <div className={"flex justify-content-center mt-6"}>
      <div className="flex flex-column col-12 md:col-8 p-5 border-round bg-white shadow-1">
        <h2 className="mt-0 mb-5">Calculators</h2>
        <div className="grid">
          {tabItems.map((tabItem, index) => (
            <div
              key={`tabItem-${index}`}
              className="col-12 mb-2 md:col-4 md:mb-0"
            >
              <Button
                className={cx("calculatorButton", "p-4")}
                style={{ width: "100%" }}
                label={tabItem.label}
                onClick={() => {router.push("/calculators/" + tabItem.label)}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
