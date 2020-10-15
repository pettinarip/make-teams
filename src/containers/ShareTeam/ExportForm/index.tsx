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
  useToast,
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
  const toast = useToast();

  useEffect(() => {
    setLink(shareLink);
  }, [shareLink]);

  function handleImageClick() {
    try {
      exportFieldToImage();
    } catch (e) {
      toast({
        title: "An error ocurred.",
        description: "While creating the image.",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <Center flexDirection="column" {...restProps}>
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
