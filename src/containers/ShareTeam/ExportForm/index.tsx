import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  ChakraProps,
  Flex,
  IconButton,
  Input,
  Link,
  useClipboard,
} from "@chakra-ui/core";

import {
  exportFieldToImage,
  whatsappLink,
  twitterLink,
  facebookLink,
} from "./export";

export interface IProps extends ChakraProps {
  shareLink: string;
}

export default function ExportForm({ shareLink, ...restProps }: IProps) {
  const [link, setLink] = useState("");
  const { hasCopied, onCopy } = useClipboard(link);

  useEffect(() => {
    setLink(shareLink);
  }, [shareLink]);

  function handleImageClick() {
    exportFieldToImage();
  }

  return (
    <Center flexDirection="column" {...restProps}>
      <Flex direction="row">
        <Link href={facebookLink(shareLink)}>
          <IconButton icon={<FaFacebook />} aria-label="Share in Facebook" />
        </Link>
        <Link href={twitterLink(shareLink)}>
          <IconButton icon={<FaTwitter />} aria-label="Share in Twitter" />
        </Link>
        <Link href={whatsappLink(shareLink)}>
          <IconButton icon={<FaWhatsapp />} aria-label="Share in Whatsapp" />
        </Link>
      </Flex>
      <Center data-testid="share-team-form">
        <Input
          data-testid="share-team-input"
          value={link}
          readOnly
          my={4}
          w={400}
        />
        <Button onClick={onCopy} ml={2} autoFocus>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Center>
      <Box>
        <Button onClick={handleImageClick}>.PNG</Button>
      </Box>
    </Center>
  );
}
