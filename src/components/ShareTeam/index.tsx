import React, { useState, useCallback } from "react";
import { Button, Input, Popup, Form } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";

import { IPosition } from "../../containers/MakeTeam/types";
import useCreateShareTeam from "../../graphql/mutations/useCreateShareTeam";

interface IProps {
  positions: Array<IPosition>;
}

export default function ShareTeam({ positions }: IProps) {
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [createShareTeam, { status }] = useCreateShareTeam();

  async function handleClick() {
    try {
      const { data } = await createShareTeam({ name: "test", positions });
      setLink(`${window.location.origin}/share/${data.createShareLink.id}`);
    } catch (e) {
      //
    }
  }

  const clearCopiedTooltip = useCallback(
    debounce(() => {
      setIsCopied(false);
    }, 2500),
    []
  );
  function handleCopyClick() {
    copy(link);

    setIsCopied(true);
    clearCopiedTooltip();
  }

  return (
    <Form>
      <Form.Field inline>
        <Button positive onClick={handleClick} loading={status === "loading"}>
          Share your team!
        </Button>
      </Form.Field>
      <Form.Field inline>
        <Popup
          open={isCopied}
          position="right center"
          content="Copied!"
          trigger={
            <Input
              action={{
                icon: "copy",
                onClick: handleCopyClick,
              }}
              defaultValue={link}
              readOnly
            />
          }
        />
      </Form.Field>
    </Form>
  );
}
