import React, { ReactNode, useState } from "react";
import { Button, Modal, Header } from "semantic-ui-react";

import FieldEdit from "../FieldEdit";
import styled from "@emotion/styled";

export interface IProps {
  children: ReactNode;
}

export default function CreateLayoutButton(props: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  // const [addNewPlayer] = useAddNewPlayer();

  let submitForm: Function = () => {};

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function bindSubmitForm(submitFormFn: Function) {
    submitForm = submitFormFn;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      // const newPlayer: Partial<IPlayer> = {
      //   firstName: values.firstName,
      //   lastName: values.lastName,
      //   number: values.number,
      // };
      // await addNewPlayer(newPlayer);
      handleClose();
    } catch (e) {
      console.log(e);
      setHasErrors(true);
    }

    setIsSubmitting(false);
  }

  return (
    <ModalStyled
      trigger={
        <Button primary onClick={handleOpen}>
          {props.children}
        </Button>
      }
      open={isOpen}
      onClose={handleClose}
      size="tiny"
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Add a new layout</Header>
          <FieldWrapper>
            <FieldEdit />
          </FieldWrapper>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button primary onClick={(e) => submitForm()} loading={isSubmitting}>
          Create
        </Button>
      </Modal.Actions>
    </ModalStyled>
  );
}

const ModalStyled = styled(Modal)`
  width: auto !important;
`;

const FieldWrapper = styled.div`
  height: 500px;
  width: 327px;
`;
