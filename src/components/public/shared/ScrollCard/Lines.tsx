import classNames from "classnames/bind";
import React from "react";

import styles from "./ScrollCard.module.scss";

export const Line1: React.FC = () => (
  <svg width="480" height="60">
    <path
      d="M5 22 H435"
      strokeWidth="2"
      style={{ stroke: "var(--light-brown)" }}
      strokeDasharray="5,5"
    />

    <g>
      <circle
        style={{
          stroke: "var(--light-brown)",
          fillOpacity: "0",
          strokeWidth: "2",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        cx="445"
        cy="22"
        r="9"
      />
      <circle fill="var(--light-brown)" cx="445" cy="22" r="6" />
    </g>
  </svg>
);

export const Line2: React.FC = () => (
  <svg width="440" height="60">
    <path
      d="M10 22 H450"
      strokeWidth="2"
      style={{ stroke: "var(--light-brown)" }}
      strokeDasharray="5,5"
    />

    <g>
      <circle
        style={{
          stroke: "var(--light-brown)",
          fillOpacity: "0",
          strokeWidth: "2",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        cx="10"
        cy="22"
        r="9"
      />
      <circle fill="var(--light-brown)" cx="10" cy="22" r="6" />
    </g>
  </svg>
);

export const Line3: React.FC = () => (
  <svg width="250" height="300">
    <path
      d="M5 150 H185 M185 150 V20 M185 20 H215"
      strokeWidth="2"
      style={{ stroke: "var(--light-brown)" }}
      strokeDasharray="5,5"
    />

    <g>
      <circle
        style={{
          stroke: "var(--light-brown)",
          fillOpacity: "0",
          strokeWidth: "2",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        cx="225"
        cy="20"
        r="9"
      />
      <circle fill="var(--light-brown)" cx="225" cy="20" r="6" />
    </g>
  </svg>
);

export const Line4: React.FC = () => (
  <svg width="250" height="300">
    <path
      d="M250 150 H75 M75 150 V18 M75 18 H40"
      strokeWidth="2"
      style={{ stroke: "var(--light-brown)" }}
      strokeDasharray="5,5"
    />

    <g>
      <circle
        style={{
          stroke: "var(--light-brown)",
          fillOpacity: "0",
          strokeWidth: "2",
          strokeDasharray: "none",
          strokeOpacity: "1",
        }}
        cx="32"
        cy="18"
        r="9"
      />
      <circle fill="var(--light-brown)" cx="32" cy="18" r="6" />
    </g>
  </svg>
);
