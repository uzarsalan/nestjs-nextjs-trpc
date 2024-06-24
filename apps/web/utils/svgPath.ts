export type Point = {
  x: number;
  y: number;
};

function distance(start: Point, end: Point) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return Math.sqrt(dx * dx + dy * dy);
}
export function calculatePath(start: Point, end: Point) {
  const center = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };

  const controlPoint = {
    x: start.x,
    y:
      start.y +
      Math.min(distance(start, end), Math.abs(end.x - start.x) / 8, 150),
  };

  return `M ${start.x},${start.y} Q ${controlPoint.x}, ${controlPoint.y} ${center.x},${center.y} T ${end.x},${end.y}`;
}
