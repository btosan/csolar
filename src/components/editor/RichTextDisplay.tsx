'use client';

import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import './prism-theme.css';
import './editor-content.css';
import DOMPurify from 'isomorphic-dompurify';

interface RichTextDisplayProps {
  content: string;
}

export default function RichTextDisplay({ content }: RichTextDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  // Initial sanitization with expanded attributes for images
  const sanitizedContent = DOMPurify.sanitize(content || '', {
    ADD_TAGS: ['iframe', 'pre', 'code', 'img', 'p'],
    ADD_ATTR: [
      'class', 
      'data-language', 
      'spellcheck', 
      'src', 
      'alt', 
      'title',
      'width',
      'height',
      'style'
    ],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        // Handle code blocks
        const preElements = contentRef.current.querySelectorAll('pre');
        preElements.forEach((pre) => {
          // Skip if already processed
          if (pre.parentElement?.classList.contains('code-block-wrapper')) {
            return;
          }

          // Create wrapper
          const wrapper = document.createElement('div');
          wrapper.className = 'code-block-wrapper';
          pre.parentNode?.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);

          // Add copy button
          const button = document.createElement('button');
          button.className = 'copy-code-button';
          button.textContent = 'Copy';
          
          button.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            if (code) {
              try {
                await navigator.clipboard.writeText(code.textContent || '');
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                  button.textContent = 'Copy';
                  button.classList.remove('copied');
                }, 2000);
              } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Error!';
              }
            }
          });

          wrapper.appendChild(button);
        });

        // Handle images
        const images = contentRef.current.querySelectorAll('img');
        images.forEach((img) => {
          // Skip if already processed
          if (img.parentElement?.classList.contains('image-wrapper')) {
            return;
          }

          // Create and apply wrapper
          const wrapper = document.createElement('div');
          wrapper.className = 'image-wrapper';
          img.parentNode?.insertBefore(wrapper, img);
          wrapper.appendChild(img);

          // Add image attributes and handling
          img.setAttribute('loading', 'lazy');
          img.classList.add('responsive-image');
          
          // Add error handling
          img.onerror = () => {
            console.error('Image failed to load:', img.src);
            img.style.display = 'none';
          };

          // Add click to view full size (optional)
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            window.open(img.src, '_blank');
          });
        });

        // Apply syntax highlighting
        Prism.highlightAllUnder(contentRef.current);
        setInitialized(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [content, initialized]);

  return (
    <div className="rich-text-content" ref={contentRef}>
      <div 
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        suppressHydrationWarning 
      />
    </div>
  );
}