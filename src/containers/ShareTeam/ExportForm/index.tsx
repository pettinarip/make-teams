import React, { useCallback, useState, MouseEvent, useEffect } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { Form, Button, Popup, Input } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";

import exportFieldToImage from "./exportFieldToImage";

enum TSizes {
  SM = "sm",
  MD = "md",
  LG = "lg",
}
export interface IFormValues {
  size?: TSizes;
}

export interface IProps {
  shareLink: string;
}

export default function ExportForm({ shareLink, ...restProps }: IProps) {
  const [link, setLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  console.log("asdnasjndasd====================");
  console.log(restProps);

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

  function handleSubmit() {
    exportFieldToImage();
  }

  return (
    <Formik<FormikValues>
      initialValues={{ size: TSizes.MD }}
      onSubmit={handleSubmit}
      validate={() => {}}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit }: FormikProps<IFormValues>) => (
        <Form onSubmit={handleSubmit} {...restProps}>
          {/* <Form.Group widths="equal">
            <Form.Radio
              id="size-sm"
              name="size"
              label="Small"
              value="sm"
              checked={values.size === "sm"}
              onChange={handleChange}
            />
            <Form.Radio
              id="size-md"
              name="size"
              label="Medium"
              value="md"
              checked={values.size === "md"}
              onChange={handleChange}
            />
            <Form.Radio
              id="size-lg"
              name="size"
              label="Large"
              value="lg"
              checked={values.size === "lg"}
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Field>
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
            <Button type="submit">.PNG</Button>
          </Form.Field>
        </Form>
      )}
    </Formik>
  );
}
