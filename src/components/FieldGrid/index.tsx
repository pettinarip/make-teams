import { Box, Center, useColorMode } from "@chakra-ui/core";
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
}

export default function FieldGrid({
  visible,
  width,
  height,
  onClick,
  onGridClick,
}: IGridProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const paddingX = 24;
  const paddingY = 50;
  const rowsAmount = 7;
  const colsAmount = 6;

  const rows = range(rowsAmount + 1);
  const cols = range(colsAmount + 1);

  const rowsP = 100 / rowsAmount;
  const colsP = 100 / colsAmount;

  function handleClick({ x, y }: IGridPosition) {
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
                w="10px"
                h="10px"
                ml="-5px"
                mt="-5px"
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
