// src/types/tiptap.d.ts
declare module '@tiptap/extension-code-block-lowlight' {
    import { Node } from '@tiptap/core'
    
    export interface CodeBlockLowlightOptions {
      lowlight: any
      defaultLanguage: string | null
      HTMLAttributes: Record<string, any>
    }
    
    declare const CodeBlockLowlight: Node<CodeBlockLowlightOptions>
    
    export default CodeBlockLowlight
  }