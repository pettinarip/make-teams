/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/core";
import { Button, Confirm } from "semantic-ui-react";

import { ILayout } from "../../containers/MakeTeam/types";
import useRemoveLayout from "../../dal/layout/useRemoveLayout";

export interface IProps {
  layout: ILayout;
  onRemoved?: (layout: ILayout) => void;
}

export default function RemoveLayoutButton(props: IProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removeLayout] = useRemoveLayout();

  function toggleConfirmModal() {
    setIsConfirmOpen(!isConfirmOpen);
  }

  function handleOnRemove() {
    // As we are performing optimistic updates, we just close the modal and
    // assume the removal was executed ok
    toggleConfirmModal();
    removeLayout(props.layout);

    if (props.onRemoved) {
      props.onRemoved(props.layout);
    }
  }

  return (
    <React.Fragment>
      <Button
        basic
        size="mini"
        icon="trash"
        onClick={toggleConfirmModal}
        css={css(`float: right`)}
        data-testid="remove-layout-btn"
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
