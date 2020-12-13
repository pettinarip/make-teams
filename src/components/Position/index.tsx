import {
  Box,
  Avatar,
  Badge,
  useColorMode,
  BoxProps,
  AvatarBadge,
  Icon,
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import { FiUser } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

import { IPosition, IShareLinkPosition } from "../../containers/MakeTeam/types";

export interface IProps extends Omit<BoxProps, "position"> {
  position: IPosition | IShareLinkPosition;
  isActive?: boolean;
  showName?: boolean;
  onRemoveClick?: () => void;
}

export default function Position({
  position,
  isActive,
  showName,
  onRemoveClick,
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

  return (
    <Box
      data-testid="position"
      cursor={isActive ? "pointer" : "inherit"}
      {...restProps}
    >
      <Avatar
        {...avatarProps}
        icon={<FiUser fontSize="1.5rem" />}
        border={isActive ? "1px dashed" : "1px solid transparent"}
      >
        {player && (
          <AvatarBadge
            left={-2}
            top={-2}
            right="inherit"
            bottom="inherit"
            border="none"
            bg="white"
            onClick={(e) => {
              e.stopPropagation();
              if (onRemoveClick) {
                onRemoveClick();
              }
            }}
          >
            <Icon as={FaTimes} color="red.300" fontSize="1rem" />
          </AvatarBadge>
        )}
      </Avatar>
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
