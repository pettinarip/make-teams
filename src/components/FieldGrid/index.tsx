import { Box, Center, useColorMode } from "@chakra-ui/react";
import range from "lodash/range";

export interface IGridPosition {
  x: number;
  y: number;
}

export interface IGridProps {
  visible: boolean;
  width: number;
  height: number;
  onClick: ({ x, y }: IGridPosition) => void;
  onGridClick: () => void;
  rowsAmount?: number;
  colsAmount?: number;
}

export default function FieldGrid({
  visible,
  width,
  height,
  onClick,
  onGridClick,
  rowsAmount = 7,
  colsAmount = 6,
}: IGridProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Padding that will define the inner content space
  const paddingX = 24;
  const paddingY = 50;

  const rows = range(rowsAmount + 1);
  const cols = range(colsAmount + 1);

  const rowsP = 100 / rowsAmount;
  const colsP = 100 / colsAmount;

  function handleClick({ x, y }: IGridPosition) {
    // Since we receive percentages from the inner content, we need to project
    // this values to the outer container which is what interests our consumers
    const innerWidth = width - paddingX * 2;
    const innerHeight = height - paddingY * 2;
    const innerX = innerWidth * (x / 100);
    const innerY = innerHeight * (y / 100);

    onClick({
      x: ((innerX + paddingX) / width) * 100,
      y: ((innerY + paddingY) / height) * 100,
    });
  }

  return (
    <Box
      position="absolute"
      w="100%"
      h="100%"
      px={`${paddingX}px`}
      py={`${paddingY}px`}
      visibility={visible ? "visible" : "hidden"}
    >
      <Box position="relative" w="100%" h="100%" onClick={onGridClick}>
        {rows.map((_row, rIndex) => {
          return cols.map((_col, cIndex) => {
            return (
              <Center
                key={`grid-${rIndex}-${cIndex}`}
                position="absolute"
                left={`${colsP * cIndex}%`}
                top={`${rowsP * rIndex}%`}
                w="20px"
                h="20px"
                ml="-10px"
                mt="-10px"
                cursor="pointer"
                _hover={{ transform: "scale(2)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick({ x: colsP * cIndex, y: rowsP * rIndex });
                }}
              >
                <Box
                  w="5px"
                  h="5px"
                  borderRadius={3}
                  bg={isDark ? "gray.400" : "white"}
                />
              </Center>
            );
          });
        })}
      </Box>
    </Box>
  );
}
