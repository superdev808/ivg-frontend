import React, { useState } from 'react';
import RSC from "react-scrollbars-custom";


const CustomScrollbar = (props: any) => {
  return (
    <RSC
      {...props}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{ ...style, backgroundColor: "rgb(23, 51, 39)" }}
            />
          );
        },
      }}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{ ...style, backgroundColor: "rgb(222, 190, 165)" }}
            />
          );
        },
      }}
    ></RSC>
  );
};

export default CustomScrollbar