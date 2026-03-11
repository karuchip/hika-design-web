"use client"

import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  code: string;
};

const CodeBlock = ({code}:Props)=> {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return(
    <div className="relative bg-[#1e1e1e] text-white p-6 pt-11 my-[20px] md:my-[30px] rounded-lg overflow-x-auto z-[0]">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
      >
        {copied ? (
          <>
            <CheckIcon sx={{fontSize:"14px"}}/><span> Copied</span>
          </>
        ):(
          <>
            <ContentCopyIcon sx={{fontSize:"14px"}}/><span> Copy</span>
          </>
        )}
      </button>

      <pre>
        <code>{code}</code>
      </pre>

    </div>
  )

}

export default CodeBlock
