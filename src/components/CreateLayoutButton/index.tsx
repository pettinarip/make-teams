import React, { ReactNode, useState } from "react";
import { Button, Modal, Header, Message } from "semantic-ui-react";

import styled from "@emotion/styled";
import CreateLayoutForm, { IFormValues } from "./CreateLayoutForm";

export interface IProps {
  children: ReactNode;
}

export default function CreateLayoutButton(props: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

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

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      console.log("submitting!", values);
      // TODO

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
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Add a new layout</Header>
          {hasErrors && (
            <Message negative>
              <Message.Header>
                There was an error with your submission
              </Message.Header>
              <p>Complete all the fields and try again.</p>
            </Message>
          )}
          <FieldWrapper>
            <CreateLayoutForm
              onSubmit={handleSubmit}
              bindSubmitForm={bindSubmitForm}
            />
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
  width: 327px;
`;
