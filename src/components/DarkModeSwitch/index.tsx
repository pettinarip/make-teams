import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      variant="ghost"
      aria-label="Dark mode"
      size="xs"
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
}
