export default function initialFormation(size: number) {
  return [
    ...new Array(2).fill(0).map((__item, index) => ({
      x: (index % 3) * (100 / 3) + 30,
      y: 15,
    })),
    ...new Array(4).fill(0).map((__item, index) => ({
      x: (index % 4) * (100 / 4) + 10,
      y: 40,
    })),
    ...new Array(4).fill(0).map((__item, index) => ({
      x: (index % 4) * (100 / 4) + 10,
      y: 65,
    })),
    {
      x: 50,
      y: 90,
    },
  ].slice(0, size);
}
