import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

import ExportForm from "../ExportForm";

interface IProps {
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  showNames: boolean;
  id: string;
}

export default function ShareModal({
  isOpen,
  isLoading,
  onClose,
  showNames,
  id,
}: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid="share-team-modal">
        <ModalHeader>Share Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading || !id ? (
            <Center>
              <Spinner data-testid="loading" />
            </Center>
          ) : (
            <ExportForm id={id} showNames={showNames} my={6} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
