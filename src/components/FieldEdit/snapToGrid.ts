// In our implementation we are using percentages, so it will snap the position
// in intervals of 5%. (0%, 5%, 10%, 15%, ...).
export const SNAP_GRID_SIZE = 5;

export default function snapToGrid(
  x: number,
  y: number,
  snapSize = SNAP_GRID_SIZE
): { x: number; y: number } {
  const snappedX = Math.round(x / snapSize) * snapSize;
  const snappedY = Math.round(y / snapSize) * snapSize;
  return { x: snappedX, y: snappedY };
}
