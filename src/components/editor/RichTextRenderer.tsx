import React from "react";

type Props = {
  content: string;
};

export default function RichTextRenderer({ content }: Props) {
  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}