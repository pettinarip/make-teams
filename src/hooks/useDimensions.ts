import { useRef, useState, useEffect } from "react";

interface IDimensions {
  width: number;
  height: number;
}

type UseDimensionsType<T extends HTMLElement> = [
  React.RefObject<T>,
  IDimensions
];

export default function useDimensions<
  T extends HTMLElement
>(): UseDimensionsType<T> {
  const element = useRef<T>(null);
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
