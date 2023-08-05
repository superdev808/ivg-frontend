import { useEffect, useState } from "react";

export default function useOutsideClick(ref: any, handler:() => void) {
  const [isClicked, setIsClicked] = useState(Boolean);
  useEffect(() => {
    const listener = (event:Event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler();
        return
      };
document.addEventListener("mousedown", listener);
return () => {
    document.removeEventListener("mousedown", listener);
};
}, [ref, handler]);
}
