import { useRef, useState, MutableRefObject, useEffect } from "react";

interface IDimensions {
  width: number;
  height: number;
}

export default function useDimensions(): [
  MutableRefObject<HTMLElement | undefined>,
  IDimensions
] {
  const element = useRef<HTMLElement>();
  const [dimensions, setDimensions] = useState<IDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (element.current) {
      setDimensions({
        width: element.current.clientWidth,
        height: element.current.clientHeight,
      });
    }
  }, []);

  return [element, dimensions];
}
