import React, { ReactNode, useState } from "react";
import { Button, Image, Modal, Header, Message } from "semantic-ui-react";

// import useAddNewPlayer from "../../graphql/mutations/useAddNewPlayer";
import { Player as IPlayer } from "../../graphql/API";
import CreatePlayerForm, { IFormValues } from "./CreatePlayerForm";

export interface IProps {
  children: ReactNode;
}

export default function CreatePlayerButton(props: IProps) {
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

  async function handleSubmit(values: IFormValues) {
    setIsSubmitting(true);
    setHasErrors(false);

    try {
      const newPlayer: Partial<IPlayer> = {
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number,
      };
      // await addNewPlayer(newPlayer);
      handleClose();
    } catch (e) {
      console.log(e);
      setHasErrors(true);
    }

    setIsSubmitting(false);
  }

  return (
    <Modal
      trigger={
        <Button primary onClick={handleOpen}>
          {props.children}
        </Button>
      }
      open={isOpen}
      onClose={handleClose}
    >
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>Add a new player to the team</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          {hasErrors && (
            <Message negative>
              <Message.Header>
                There was an error with your submission
              </Message.Header>
              <p>Complete all the fields and try again.</p>
            </Message>
          )}
          <CreatePlayerForm
            onSubmit={handleSubmit}
            bindSubmitForm={bindSubmitForm}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button primary onClick={(e) => submitForm()} loading={isSubmitting}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
