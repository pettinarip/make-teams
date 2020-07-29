/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/core";
import { Button, Confirm } from "semantic-ui-react";

import { ILayout } from "../../containers/MakeTeam/types";
import useRemoveLayout from "../../graphql/mutations/useRemoveLayout";

export interface IProps {
  layout: ILayout;
}

export default function RemoveLayoutButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removeLayout] = useRemoveLayout();

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  async function handleOnRemove() {
    await removeLayout(props.layout);
    toggleConfirmModal();
  }

  return (
    <React.Fragment>
      <Button
        basic
        size="mini"
        icon="trash"
        onClick={toggleConfirmModal}
        css={css(`float: right`)}
      />
      <Confirm
        open={isConfirmOpen}
        onCancel={toggleConfirmModal}
        onConfirm={handleOnRemove}
        header={`Remove layout ${props.layout.name}`}
        content={`Are you sure?`}
        cancelButton="No"
        confirmButton="Do it!"
      />
    </React.Fragment>
  );
}
