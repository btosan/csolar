import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import Prism from 'prismjs'

export interface CodeBlockOptions {
  HTMLAttributes: Record<string, any>
  languageClassPrefix: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeBlock: {
      setCodeBlock: (attributes?: { language: string }) => ReturnType
      toggleCodeBlock: (attributes?: { language: string }) => ReturnType
    }
  }
}

export const CodeBlockExtension = Node.create<CodeBlockOptions>({
  name: 'codeBlock',

  addOptions() {
    return {
      languageClassPrefix: 'language-',
      HTMLAttributes: {
        class: 'code-block-wrapper',
      },
    }
  },

  content: 'text*',

  marks: '',

  group: 'block',

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'plaintext',
        parseHTML: element => {
          return element.getAttribute('data-language') || 'plaintext'
        },
        renderHTML: attributes => {
          return {
            class: `language-${attributes.language}`,
            'data-language': attributes.language,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      { class: 'code-block-wrapper' },
      [
        'pre',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `language-${node.attrs.language}`,
          'data-language': node.attrs.language,
        }),
        [
          'code',
          {
            class: `language-${node.attrs.language}`,
          },
          0,
        ],
        [
          'button',
          {
            class: 'copy-code-button',
            type: 'button',
            'data-copy-state': 'copy',
          },
          'Copy',
        ],
      ],
    ]
  },

  addCommands() {
    return {
      setCodeBlock:
        attributes => ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
      toggleCodeBlock:
        attributes => ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('codeblock-highlight'),
        props: {
          decorations: ({ doc, selection }) => {
            const decorations: Decoration[] = []
            doc.descendants((node, pos) => {
              if (node.type.name !== this.name) return

              const content = node.textContent
              const language = node.attrs.language || 'plaintext'

              if (!Prism.languages[language]) {
                return
              }

              try {
                const tokens = Prism.tokenize(content, Prism.languages[language])
                let offset = 0

                const processToken = (token: string | Prism.Token, parentTokenTypes: string[] = []) => {
                  if (typeof token === 'string') {
                    offset += token.length
                    return
                  }

                  const tokenTypes = [...parentTokenTypes]
                  if (token.type) {
                    tokenTypes.push(token.type)
                  }

                  if (typeof token.content === 'string') {
                    const startPos = pos + 1 + offset
                    const endPos = startPos + token.content.length

                    decorations.push(
                      Decoration.inline(startPos, endPos, {
                        class: `token ${tokenTypes.join(' ')}`,
                      })
                    )

                    offset += token.content.length
                  } else if (Array.isArray(token.content)) {
                    token.content.forEach(subToken => {
                      processToken(subToken, tokenTypes)
                    })
                  }
                }

                tokens.forEach(token => processToken(token))
              } catch (e) {
                console.error(`Error highlighting code block: ${e}`)
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})