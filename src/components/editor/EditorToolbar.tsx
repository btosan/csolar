"use client";

import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export default function EditorToolbar({ editor }: Props) {
  const buttonClass = (active: boolean) =>
    `px-3 py-1.5 text-sm rounded border transition ${
      active
        ? "bg-black text-white border-black"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-wrap gap-2 border rounded p-2 bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
      >
        Bullet
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="px-3 py-1.5 text-sm rounded border bg-white border-gray-300 hover:bg-gray-100"
      >
        Undo
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="px-3 py-1.5 text-sm rounded border bg-white border-gray-300 hover:bg-gray-100"
      >
        Redo
      </button>
    </div>
  );
}