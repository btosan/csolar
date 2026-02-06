// next/web/src/components/editor/TiptapEditor.tsx show toolbox
import './editor.css'
import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { Color } from "@tiptap/extension-color"
import FontFamily from "@tiptap/extension-font-family"
import { TextStyle } from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import { Table } from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import ImageResize from "tiptap-extension-resize-image"
import { ColorResult, SketchPicker } from 'react-color'
import { CodeBlockExtension } from './CodeBlockExtension'
import { FontSize } from './font-size'
import './editor-content.css'
import './prism-theme.css'

import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
// copy
interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  editable?: boolean
  placeholder?: string
}

interface TableOptionsProps {
  isOpen: boolean
  position: { x: number; y: number }
}

const availableFonts = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Courier New', value: 'Courier New' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Verdana', value: 'Verdana' },
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Tahoma', value: 'Tahoma' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS' },
  { name: 'Impact', value: 'Impact' },
  { name: 'Comic Sans MS', value: 'Comic Sans MS' }
]

const TiptapEditor: React.FC<TiptapEditorProps> = ({ 
  content, 
  onChange,
  editable = true,
  placeholder = 'Write something...'
}) => {
  const [linkUrl, setLinkUrl] = useState<string>('')
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [showImageInput, setShowImageInput] = useState<boolean>(false)
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [showFontFamily, setShowFontFamily] = useState<boolean>(false)
  const [tableOptions, setTableOptions] = useState<TableOptionsProps>({
    isOpen: false,
    position: { x: 0, y: 0 }
  })
  const [isToolboxVisible, setIsToolboxVisible] = useState<boolean>(false)

  const preventFormSubmission = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLElement;
      const isInEditor = target.closest('.ProseMirror') !== null;
      const isButton = target.tagName === 'BUTTON';
  
      if (isInEditor) {
        return;
      }
  
      if (isButton) {
        event.preventDefault();
        // event.stopPropagation();
      }
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        paragraph: {
          HTMLAttributes: {
            class: 'editor-paragraph',
          },
        },
      }),
      CodeBlockExtension.configure({
        HTMLAttributes: {
          class: 'code-block',
        },
      }),
      FontSize,
      Placeholder.configure({
        placeholder: placeholder || 'Write something...',
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-400 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'table'],
      }),
      Image.configure({
        allowBase64: true,
        inline: false,
        HTMLAttributes: {
          class: 'responsive-image',
        },
      }),
      Color.configure(),
      TextStyle,
      FontFamily,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-fixed w-full border border-gray-700',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none min-h-[150px] focus:outline-none text-gray-50',
        spellcheck: 'false',
      },
handleKeyDown: (view, event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Block default Enter

    const { state, dispatch } = view;
    const { selection } = state;
    const { $from } = selection;

    // Insert a hard break (<br>) at cursor position – this creates a single line break without new paragraph
    dispatch(state.tr.insert($from.pos, state.schema.nodes.hardBreak.create()).scrollIntoView());

    // Optional: If you want to create a new paragraph only when needed (e.g., at end of line)
    // dispatch(state.tr.split($from.pos).scrollIntoView());

    return true; // Mark as handled
  }
  return false;
},
      handleDOMEvents: {
        keydown: (view, event) => {
          if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
              case 'b': 
                event.preventDefault()
                editor?.chain().focus().toggleBold().run()
                return true
              case 'i':
                event.preventDefault()
                editor?.chain().focus().toggleItalic().run()
                return true
              case 'u':
                event.preventDefault()
                editor?.chain().focus().toggleUnderline().run()
                return true
              case 'k':
                event.preventDefault()
                setShowLinkInput(true)
                return true
              case '1':
                event.preventDefault()
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
                return true
              case '2':
                event.preventDefault()
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
                return true
              case '3':
                event.preventDefault()
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
                return true
            }
          }
    
          if (event.key === 'Enter') {
            event.stopPropagation()
          }
          return false
        },
        paste: (view, event) => {
          const html = event.clipboardData?.getData('text/html');
          const text = event.clipboardData?.getData('text/plain');
          
          const items = Array.from(event.clipboardData?.items || []);
          const imageItem = items.find(item => item.type.startsWith('image'));

          return false;
        },

        drop: (view, event) => {
          const hasFiles = event.dataTransfer?.files.length
          
          if (hasFiles) {
            event.preventDefault()
            Array.from(event.dataTransfer.files).forEach(file => {
              if (file.type.startsWith('image')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                  const imageUrl = e.target?.result as string
                  editor?.chain().focus().setImage({ src: imageUrl }).run()
                }
                reader.readAsDataURL(file)
              }
            })
            return true
          }
          return false
        },
      }
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', preventFormSubmission, true);
    return () => {
      document.removeEventListener('keydown', preventFormSubmission, true);
    };
  }, [])

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        Prism.highlightAll()
      }, 0)
    }
  }, [editor?.getHTML()])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableOptions.isOpen && !(event.target as Element).closest('.table-menu')) {
        setTableOptions(prev => ({ ...prev, isOpen: false }));
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tableOptions.isOpen]);

  useEffect(() => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.ProseMirror')) {
        console.log('Input event detected in editor');
      }
    };
  
    document.addEventListener('input', handleInput, true);
    return () => {
      document.removeEventListener('input', handleInput, true);
    };
  }, []);

  useEffect(() => {
    const handleMobileEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        if (target.closest('.ProseMirror')) {
          editor?.commands.enter();
        }
      }
    };
  
    document.addEventListener('keydown', handleMobileEnter, true);
    return () => {
      document.removeEventListener('keydown', handleMobileEnter, true);
    };
  }, [editor]);

  const languages = [
    'typescript',
    'javascript',
    'python',
    'java',
    'go',
    'rust',
    'css',
    'json',
    'yaml',
    'markdown',
    'plaintext',
  ]

  if (!editor) {
    return (
      <div className="min-h-37.5 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-md text-gray-400">
        Loading editor...
      </div>
    )
  }

  // Editor commands
  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run()
  const toggleStrike = () => editor.chain().focus().toggleStrike().run()
  const toggleCode = () => editor.chain().focus().toggleCode().run()
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run()
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run()
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
  const toggleTaskList = () => editor.chain().focus().toggleTaskList().run()
  const toggleHeading = (level: 1 | 2 | 3) => editor.chain().focus().toggleHeading({ level }).run()
  const setHorizontalRule = () => editor.chain().focus().setHorizontalRule().run()
  const undo = () => editor.chain().focus().undo().run()
  const redo = () => editor.chain().focus().redo().run()
  const clearFormatting = () => editor.chain().focus().clearNodes().unsetAllMarks().run()
  const setCodeBlockLanguage = (language: string) => editor.chain().focus().updateAttributes('codeBlock', { language }).run()
  
  // Table commands
  const insertTable = () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run()
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run()
  const deleteColumn = () => editor.chain().focus().deleteColumn().run()
  const addRowBefore = () => editor.chain().focus().addRowBefore().run()
  const addRowAfter = () => editor.chain().focus().addRowAfter().run()
  const deleteRow = () => editor.chain().focus().deleteRow().run()
  const deleteTable = () => editor.chain().focus().deleteTable().run()
  const mergeCells = () => editor.chain().focus().mergeCells().run()
  const splitCell = () => editor.chain().focus().splitCell().run()

  const setTextAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    editor.chain().focus().setTextAlign(align).run()
  }

  const setFontFamily = (font: string) => {
    editor.chain().focus().setFontFamily(font).run()
  }

  const setColor = (color: ColorResult) => {
    editor.chain().focus().setColor(color.hex).run()
  }
  
  // Link handling
  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }
  
  const unsetLink = () => editor.chain().focus().unsetLink().run()
  
  // Image handling
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      editor.chain()
        .focus()
        .setImage({ 
          src: imageUrl,
          alt: file.name,
          title: file.name,
        })
        .run()
    }
    reader.readAsDataURL(file)
  }
  
  const addImage = () => {
    if (imageUrl) {
      editor.chain()
        .focus()
        .setImage({ 
          src: imageUrl,
          alt: 'Uploaded image',
          title: 'Uploaded image',
        })
        .run()
      setImageUrl('')
      setShowImageInput(false)
    }
  }

  const handleImageInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handleImageUpload(file)
      }
    }
    input.click()
  }

  return (
    <div className="tiptap-editor-container border border-gray-800 rounded-md bg-gray-900">
      {editable && (
        <>
          <button
            type="button"
            onClick={() => setIsToolboxVisible(!isToolboxVisible)}
            className="p-2 bg-linear-to-l from-gray-800 via-purple-900 to-gray-800 hover:bg-linear-to-r mb-2 text-xs text-gray-200 hover:text-white hover:cursor-pointer w-full rounded-t-md"
          >
            {isToolboxVisible ? 'Hide Toolbox' : 'Show Toolbox'}
          </button>

          {isToolboxVisible && (
            <div className="editor-toolbar p-2 border-b border-gray-700 flex flex-wrap gap-1 items-center bg-gray-950">
              {/* Font Family Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFontFamily(!showFontFamily)}
                  className="editor-toolbar-btn p-1 px-2 rounded hover:bg-gray-800 text-gray-200 hover:text-white text-xs flex items-center gap-1"
                >
                  <span className="text-sm truncate" style={{ 
                    fontFamily: editor.getAttributes('textStyle').fontFamily || 'Arial' 
                  }}>
                    {editor.getAttributes('textStyle').fontFamily || 'Arial'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                {showFontFamily && (
                  <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                    {availableFonts.map(font => (
                      <button
                        key={font.value}
                        type="button"
                        onClick={() => {
                          setFontFamily(font.value)
                          setShowFontFamily(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-700 text-gray-200 hover:text-white text-xs"
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Color Picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="editor-toolbar-btn p-1 rounded bg-purple-900 hover:bg-purple-800 flex items-center"
                  style={{
                    color: editor.getAttributes('textStyle').color || '#60a5fa'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"/>
                  </svg>
                </button>
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-1 z-50">
                    <SketchPicker
                      color={editor.getAttributes('textStyle').color || '#000000'}
                      onChange={setColor}
                    />
                  </div>
                )}
              </div>

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Basic Formatting */}
              <button
                type="button"
                onClick={toggleBold}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('bold') ? 'bg-gray-800' : ''}`}
                title="Bold (Ctrl+B)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleItalic}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('italic') ? 'bg-gray-800' : ''}`}
                title="Italic (Ctrl+I)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="4" x2="10" y2="4"></line>
                  <line x1="14" y1="20" x2="5" y2="20"></line>
                  <line x1="15" y1="4" x2="9" y2="20"></line>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleUnderline}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('underline') ? 'bg-gray-800' : ''}`}
                title="Underline (Ctrl+U)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                  <line x1="4" y1="21" x2="20" y2="21"></line>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleStrike}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('strike') ? 'bg-gray-800' : ''}`}
                title="Strikethrough"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <path d="M16 6C16 6 14.5 6 12 6C9.5 6 7 7 7 10C7 13 10 14 12 14"></path>
                  <path d="M12 14C14.5 14 17 15 17 18C17 21 14.5 22 12 22C9.5 22 8 22 8 22"></path>
                </svg>
              </button>

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Headings */}
              <button
                type="button"
                onClick={() => toggleHeading(1)}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-800' : ''}`}
                title="Heading 1"
              >
                <span className="font-bold">H1</span>
              </button>

              <button
                type="button"
                onClick={() => toggleHeading(2)}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-800' : ''}`}
                title="Heading 2"
              >
                <span className="font-bold">H2</span>
              </button>

              <button
                type="button"
                onClick={() => toggleHeading(3)}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-800' : ''}`}
                title="Heading 3"
              >
                <span className="font-bold">H3</span>
              </button>

              <span className="w-px h-6 bg-gray-700 mx-1"></span>

              {/* Font Size Control */}
              <div className="relative">
                <select
                  value={editor.getAttributes('textStyle').fontSize || '16px'}
                  onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
                  className="editor-toolbar-btn p-1 px-2 rounded hover:bg-gray-800 text-gray-200 hover:text-white text-xs bg-gray-900 border border-gray-700"
                >
                  {[
                    '12px', '14px', '16px', '18px', '20px', 
                    '24px', '30px', '36px', '48px', '60px'
                  ].map(size => (
                    <option key={size} value={size} className="bg-gray-900 text-gray-200">
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Lists */}
              <button
                type="button"
                onClick={toggleBulletList}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('bulletList') ? 'bg-gray-800' : ''}`}
                title="Bullet List"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleOrderedList}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('orderedList') ? 'bg-gray-800' : ''}`}
                title="Ordered List"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="10" y1="6" x2="21" y2="6"></line>
                  <line x1="10" y1="12" x2="21" y2="12"></line>
                  <line x1="10" y1="18" x2="21" y2="18"></line>
                  <path d="M4 6h1v4"></path>
                  <path d="M4 10h2"></path>
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleTaskList}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('taskList') ? 'bg-gray-800' : ''}`}
                title="Task List"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </button>

              <span className="w-px h-6 bg-gray-700 mx-1" />

              <button
                type="button"
                onClick={insertTable}
                className="editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                title="Insert Table"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
              </button>

              {/* Link handling */}
              {showLinkInput ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="border border-gray-700 rounded p-1 text-sm w-40 bg-gray-900 text-gray-200"
                    onKeyDown={(e) => e.key === 'Enter' && setLink()}
                  />
                  <button
                    type="button"
                    onClick={setLink}
                    className="p-1 ml-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                    title="Apply Link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLinkInput(false)}
                    className="p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                    title="Cancel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const url = editor.getAttributes('link').href;
                    setLinkUrl(url || '');
                    setShowLinkInput(true);
                  }}
                  className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('link') ? 'bg-gray-800' : ''}`}
                  title="Insert Link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </button>
              )}

              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={unsetLink}
                  className="p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                  title="Remove Link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              )}

              <span className="w-px h-6 bg-gray-700 mx-1"></span>

              {/* Text Alignment */}
              {['left', 'center', 'right', 'justify'].map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => setTextAlign(align as 'left' | 'center' | 'right' | 'justify')}
                  className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${
                    editor.isActive({ textAlign: align }) ? 'bg-gray-800' : ''
                  }`}
                  title={`Align ${align}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {align === 'left' && (
                      <>
                        <line x1="17" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="17" y1="18" x2="3" y2="18" />
                      </>
                    )}
                    {align === 'center' && (
                      <>
                        <line x1="18" y1="10" x2="6" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="18" y1="18" x2="6" y2="18" />
                      </>
                    )}
                    {align === 'right' && (
                      <>
                        <line x1="21" y1="10" x2="7" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="7" y2="18" />
                      </>
                    )}
                    {align === 'justify' && (
                      <>
                        <line x1="21" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="3" y2="18" />
                      </>
                    )}
                  </svg>
                </button>
              ))}

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Image Upload */}
              <button
                type="button"
                onClick={handleImageInput}
                className="editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                title="Upload Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>

              {/* Code Block */}
              <button
                type="button"
                onClick={toggleCodeBlock}
                className={`editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white ${editor.isActive('codeBlock') ? 'bg-gray-800' : ''}`}
                title="Code Block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </button>

              {editor.isActive('codeBlock') && (
                <select
                  value={editor.getAttributes('codeBlock').language || 'plaintext'}
                  onChange={(e) => setCodeBlockLanguage(e.target.value)}
                  className="ml-2 text-sm rounded p-1 bg-gray-900 border border-gray-700 text-gray-200 outline-none"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              )}

              <span className="w-px h-6 bg-gray-700 mx-1" />

              {/* Undo/Redo */}
              <button
                type="button"
                onClick={undo}
                className="editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                title="Undo"
                disabled={!editor.can().undo()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>

              <button
                type="button"
                onClick={redo}
                className="editor-toolbar-btn p-1 rounded hover:bg-gray-800 text-gray-200 hover:text-white"
                title="Redo"
                disabled={!editor.can().redo()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      <div className="editor-content-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <EditorContent 
          editor={editor} 
          className="editor-content prose prose-invert max-w-none text-gray-50" 
        />
      </div>
    </div>
  )
}

export default TiptapEditor

// handlekeydown