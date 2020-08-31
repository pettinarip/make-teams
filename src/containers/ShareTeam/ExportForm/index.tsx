import React, { useCallback, useState, MouseEvent, useEffect } from "react";
import { Form, Button, Popup, Input, Icon } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";

import {
  exportFieldToImage,
  whatsappLink,
  twitterLink,
  facebookLink,
} from "./export";

export interface IProps {
  shareLink: string;
}

export default function ExportForm({ shareLink, ...restProps }: IProps) {
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setLink(shareLink);
  }, [shareLink]);

  const clearCopiedTooltip = useCallback(
    debounce(() => {
      setIsCopied(false);
    }, 2500),
    []
  );

  function handleCopyClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    copy(link);

    setIsCopied(true);
    clearCopiedTooltip();
  }

  function handleImageClick() {
    exportFieldToImage();
  }

  return (
    <Form>
      <Form.Field>
        <Button icon as="a" href={facebookLink(shareLink)} target="__blank">
          <Icon name="facebook" />
        </Button>
        <Button icon as="a" href={twitterLink(shareLink)} target="__blank">
          <Icon name="twitter" />
        </Button>
        <Button icon as="a" href={whatsappLink(shareLink)} target="__blank">
          <Icon name="whatsapp" />
        </Button>
      </Form.Field>
      <Form.Field {...restProps}>
        <Popup
          open={isCopied}
          position="right center"
          content="Copied!"
          trigger={
            <Input
              action={{
                icon: "copy",
                title: "Copy",
                onClick: handleCopyClick,
              }}
              value={link}
              readOnly
              data-testid="share-team-input"
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Button onClick={handleImageClick}>.PNG</Button>
      </Form.Field>
    </Form>
  );
}
