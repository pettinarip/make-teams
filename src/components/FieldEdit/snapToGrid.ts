// In our implementation we are using percentages, so it will snap the position
// in intervals of 5%. (0%, 5%, 10%, 15%, ...).
export const SNAP_GRID_SIZE = 5;

export default function snapToGrid(
  x: number,
  y: number
): { x: number; y: number } {
  const snappedX = Math.round(x / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
  const snappedY = Math.round(y / SNAP_GRID_SIZE) * SNAP_GRID_SIZE;
  return { x: snappedX, y: snappedY };
}
