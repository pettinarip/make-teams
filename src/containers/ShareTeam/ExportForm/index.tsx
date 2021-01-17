import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  Button,
  Center,
  ChakraProps,
  Flex,
  IconButton,
  Input,
  Link,
  useClipboard,
  useColorMode,
} from "@chakra-ui/react";

import { whatsappLink, twitterLink, facebookLink } from "./export";

export interface IProps extends ChakraProps {
  id: string;
  shareLink: string;
  showNames: boolean;
}

export default function ExportForm({
  id,
  shareLink,
  showNames,
  ...restProps
}: IProps) {
  const [link, setLink] = useState("");
  const { hasCopied, onCopy } = useClipboard(link);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    setLink(shareLink);
  }, [shareLink]);

  return (
    <Center flexDirection="column" {...restProps}>
      <Center data-testid="share-team-form">
        <Input
          data-testid="share-team-input"
          value={link}
          readOnly
          my={4}
          w={{ base: "auto", sm: 400 }}
        />
        <Button onClick={onCopy} ml={2} autoFocus>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Center>
      <Flex direction="row">
        <Link href={facebookLink(shareLink)} mx={1}>
          <IconButton icon={<FaFacebook />} aria-label="Share in Facebook" />
        </Link>
        <Link href={twitterLink(shareLink)} mx={1}>
          <IconButton icon={<FaTwitter />} aria-label="Share in Twitter" />
        </Link>
        <Link href={whatsappLink(shareLink)} mx={1}>
          <IconButton icon={<FaWhatsapp />} aria-label="Share in Whatsapp" />
        </Link>
        <Button
          as={Link}
          href={`${process.env.NEXT_PUBLIC_API_URL}/image?id=${id}&dark=${
            isDark ? 1 : 0
          }&names=${showNames ? 1 : 0}`}
          download
          target="__blank"
          mx={1}
        >
          .PNG
        </Button>
      </Flex>
    </Center>
  );
}
