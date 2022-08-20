import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import {
  Button,
  Center,
  ChakraProps,
  IconButton,
  Input,
  Link,
  useClipboard,
  useColorMode,
  Box,
  Flex,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import { whatsappLink, twitterLink, facebookLink } from "./export";
import { useEffect, useState } from "react";

export interface IProps extends ChakraProps {
  id: string;
  showNames: boolean;
}

export default function ExportForm({ id, showNames, ...restProps }: IProps) {
  const link = `${window.location.origin}/share/${id}`;

  const [imageURL, setImageURL] = useState<string>();
  const [error, setError] = useState<string>();
  const { hasCopied, onCopy } = useClipboard(link);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    async function fetchImage() {
      try {
        // TODO: move this logic into some other place
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/image?id=${id}&dark=${
            isDark ? 1 : 0
          }&names=${showNames ? 1 : 0}`
        );

        if (response.ok) {
          const blob = await response.blob();
          setImageURL(URL.createObjectURL(blob));
        } else {
          throw new Error("Error generating the image");
        }
      } catch (e) {
        setError("There was an error generating the image.");
      }
    }

    fetchImage();
  }, []);

  return (
    <Box {...restProps}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {imageURL && (
        <Center my={4} flexDirection="column">
          <Image
            data-testid="share-team-image"
            src={imageURL}
            fallbackSrc="https://via.placeholder.com/262x400"
            maxW={262}
          />
          <Button
            colorScheme="green"
            as={Link}
            download="team.png"
            href={imageURL}
            mt={4}
          >
            Save image
          </Button>
        </Center>
      )}
      <Center my={4} flexDirection="row">
        <Link href={facebookLink(link)} mx={1}>
          <IconButton icon={<FaFacebook />} aria-label="Share in Facebook" />
        </Link>
        <Link href={twitterLink(link)} mx={1}>
          <IconButton icon={<FaTwitter />} aria-label="Share in Twitter" />
        </Link>
        <Link href={whatsappLink(link)} mx={1}>
          <IconButton icon={<FaWhatsapp />} aria-label="Share in Whatsapp" />
        </Link>
      </Center>
      <Flex my={4} data-testid="share-team-form" w="100%" alignItems="center">
        <Input
          data-testid="share-team-input"
          value={link}
          readOnly
          flex={1}
          w={{ base: "auto" }}
        />
        <Button onClick={onCopy} ml={2} autoFocus>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </Box>
  );
}
