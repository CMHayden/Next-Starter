"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { InsertGuestbookEntrySchema } from "@/db/schema/guestbook-entries";

import { createGuestbookEntry } from "./actions";

export default function GuestBookClient() {
  const [lastResult, action] = useFormState(createGuestbookEntry, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertGuestbookEntrySchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form
      className="mt-4 flex flex-col gap-2"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
    >
      <Textarea
        label="Message"
        placeholder="Enter your message"
        className="w-full"
        key={fields.message.key}
        name={fields.message.name}
        isInvalid={!fields.message.valid}
        errorMessage={fields.message.errors}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
