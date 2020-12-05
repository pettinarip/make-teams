import { Box, Avatar, Badge, useColorMode, BoxProps } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { FiUser } from "react-icons/fi";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";

export interface IProps extends Omit<BoxProps, "position"> {
  position: IPosition | IShareLinkPosition;
  isActive?: boolean;
  showName?: boolean;
}

export default function Position({
  position,
  isActive,
  showName,
  ...restProps
}: IProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const player = position.player;
  const playerName = `${player?.lastName}, ${player?.firstName}`;

  const avatarProps: any = {
    name: player ? playerName : "",
  };

  if (!player) {
    const darkColor = "gray.600";
    const lightColor = "gray.400";
    avatarProps.bg = isDark ? darkColor : lightColor;
  }

  if (isActive) {
    avatarProps.border = "1px dashed";
  }

  return (
    <Box
      data-testid="position"
      cursor={isActive ? "pointer" : "inherit"}
      {...restProps}
    >
      <Avatar {...avatarProps} icon={<FiUser fontSize="1.5rem" />} />
      {player && <Badge>{player.number}</Badge>}
      {player && showName && (
        <Name>{`${player.lastName}, ${player.firstName}`}</Name>
      )}
    </Box>
  );
}

const Name = styled.span`
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: 80px;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
