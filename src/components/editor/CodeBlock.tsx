'use client';

import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Import additional languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = true,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <pre
        className={`${
          showLineNumbers ? 'line-numbers' : ''
        } relative !bg-[#1e1e1e] !m-0 p-4`}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Copy
      </button>
    </div>
  );
};

export default CodeBlock;