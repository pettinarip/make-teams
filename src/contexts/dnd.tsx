import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

type OnDropFunction = (type: string, args: Array<unknown>) => void;

interface Target {
  accept: Array<string>;
  element: HTMLElement;
  onDrop: OnDropFunction;
}

interface IDnDContext {
  targets: Array<Target>;
  addTarget: (target: Target) => void;
  notify: (type: string, xy: [number, number], args: Array<unknown>) => void;
}

export const DndContext = createContext<IDnDContext | undefined>(undefined);
DndContext.displayName = "DndContext";

export function useDndContext(): IDnDContext {
  const context = useContext(DndContext);

  if (context === undefined) {
    throw new Error("no DndContextProvider found");
  }

  return context;
}

interface IDropProps {
  accept: Array<string>;
  onDrop: OnDropFunction;
}

export function useDrop({ accept, onDrop }: IDropProps) {
  const { addTarget } = useDndContext();
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      addTarget({
        accept,
        element: ref.current,
        onDrop,
      });
    }
  }, []);

  return { ref };
}

interface IDragProps {
  type: string;
  onTap?: () => void;
}

export function useDrag({ type, onTap }: IDragProps) {
  const { notify } = useDndContext();

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], tap }) => {
        if (tap && onTap) {
          onTap();
        }

        // animate
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
      },
      onDragEnd: ({ args, xy }) => {
        notify(type, xy, args);
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    }
  );

  return { x, y, bind };
}

interface IDnDContextProviderProps {}

export const DndContextProvider: React.FC<IDnDContextProviderProps> = ({
  children,
}) => {
  const [targets, setTargets] = useState<Array<Target>>([]);

  function addTarget(target: Target): void {
    setTargets((targets) => [...targets, target]);
  }

  function notify(
    type: string,
    xy: [number, number],
    args: Array<unknown>
  ): void {
    targets.forEach((target) => {
      if (!target.accept.includes(type)) {
        return;
      }

      const element = target.element;
      const rect = element.getBoundingClientRect();
      const is = isPointInRect(xy, rect);
      if (is) {
        target.onDrop(type, args);
      }
    });
  }

  return (
    <DndContext.Provider value={{ targets, addTarget, notify }}>
      {children}
    </DndContext.Provider>
  );
};

function isPointInRect(point: [x: number, y: number], rect: DOMRect) {
  const [x, y] = point;
  const { left, top, width, height } = rect;

  const isInX = x >= left && x <= left + width;
  const isInY = y >= top && y <= top + height;

  return isInX && isInY;
}
