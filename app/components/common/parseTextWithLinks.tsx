import Link from "next/link";

const isExternal = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const parseTextWithLinks = (text: string) => {
  // [label](url)を区切りとして分解
  const parts = text.split(/(\[.*?\]\(.*?\))/);

  // リンク部分だけ抽出
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);

    if (match) {
      const label = match[1];
      const url = match[2];

      if (isExternal(url)) {
        return(
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {label}
          </a>
        );
      }

      return (
        <Link key={i} href={url} className="text-blue-500 underline">
          {label}
        </Link>
      )
    }

    return <span key={i}>{part}</span>
  })
}

export default parseTextWithLinks
