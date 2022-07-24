import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSpring } from "@react-spring/web";
import { EventTypes, FullGestureState, useGesture } from "@use-gesture/react";
import { Map } from "immutable";

type DragState = Omit<FullGestureState<"drag">, "event"> & {
  event: EventTypes["drag"];
};

type OnDropFunction = (type: string, dragState: DragState) => void;

interface Target {
  accept: Array<string>;
  element: HTMLElement;
  onDrop: OnDropFunction;
}

interface IDnDContext {
  targets: Map<HTMLElement, Target>;
  addTarget: (target: Target) => void;
  removeTarget: (element: HTMLElement) => void;
  notify: (type: string, dragState: DragState) => void;
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

type UseDropType<T extends HTMLElement> = { ref: React.RefObject<T> };

export function useDrop<T extends HTMLElement>(
  { accept, onDrop }: IDropProps,
  deps: Array<any> = []
): UseDropType<T> {
  const { addTarget, removeTarget } = useDndContext();
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      addTarget({
        accept,
        element: ref.current,
        onDrop,
      });
    }

    return () => {
      if (ref.current) {
        removeTarget(ref.current);
      }
    };
  }, deps);

  return { ref };
}

interface IDragProps {
  x?: number;
  y?: number;
  type: string;
  returnToOrigin?: boolean;
  onTap?: () => void;
}

export function useDrag({
  x = 0,
  y = 0,
  type,
  returnToOrigin = false,
  onTap,
}: IDragProps) {
  const { notify } = useDndContext();

  const [style, api] = useSpring(() => ({ x, y }), [x, y]);

  const bind = useGesture(
    {
      onDrag: ({ down, offset: [ox, oy], tap }) => {
        if (tap && onTap) {
          onTap();
        }

        // animate
        if (returnToOrigin) {
          api.start({ x: down ? ox : x, y: down ? oy : y, immediate: down });
        } else {
          api.start({ x: ox, y: oy, immediate: down });
        }
      },
      onDragEnd: (dragState) => {
        notify(type, dragState);
      },
    },
    {
      drag: {
        filterTaps: true,
        from: () => [style.x.get(), style.y.get()],
      },
    }
  );

  return { ...style, bind };
}

interface IDnDContextProviderProps {}

export const DndContextProvider: React.FC<IDnDContextProviderProps> = ({
  children,
}) => {
  const [targets, setTargets] = useState<Map<HTMLElement, Target>>(Map());

  function addTarget(target: Target): void {
    setTargets((targets) => targets.set(target.element, target));
  }

  function removeTarget(element: HTMLElement): void {
    setTargets((targets) => targets.delete(element));
  }

  function notify(type: string, dragState: DragState): void {
    const { xy } = dragState;
    targets.forEach((target) => {
      if (!target.accept.includes(type)) {
        return;
      }

      const element = target.element;
      const rect = element.getBoundingClientRect();
      const isIn = isPointInRect(xy, rect);
      if (isIn) {
        target.onDrop(type, dragState);
      }
    });
  }

  return (
    <DndContext.Provider value={{ targets, addTarget, removeTarget, notify }}>
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
