import React, { useCallback, useState, MouseEvent } from "react";
import { Formik, FormikProps, FormikValues } from "formik";
import { Form, Button, Popup, Input, Checkbox } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";

import exportFieldToImage from "./exportFieldToImage";

export interface IFormValues {
  size?: "sm" | "md" | "lg";
}

export interface IProps {
  shareLink: string;
  onShowNamesChange: () => void;
}

export default function ExportForm(props: IProps) {
  const [link, setLink] = useState(props.shareLink);
  const [isCopied, setIsCopied] = useState(false);

  const initialState = {
    size: "md",
  };

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
      initialValues={initialState}
      onSubmit={handleSubmit}
      validate={() => {}}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
      }: FormikProps<IFormValues>) => (
        <Form onSubmit={handleSubmit}>
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
            <Checkbox
              toggle
              label="Show names"
              onChange={props.onShowNamesChange}
            />
          </Form.Field>
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
                  defaultValue={link}
                  readOnly
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
