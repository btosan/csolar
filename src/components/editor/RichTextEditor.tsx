"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <EditorToolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="border rounded p-4 min-h-50 bg-white"
      />
    </div>
  );
}