export type ListItem = {
  id: string;      // 各行を識別するID（Reactのkeyなどで必須）
  text: string;    // 入力内容
  order: number;   // 行番号（1, 2, 3...）
};


export type BlockType =
  | {
      id: string
      order: number
      type: "heading"
      level: 1 | 2 | 3
      content: string
    }
  | {
      id: string
      order: number
      type: "text"
      content: string
      style?: {
        bold?: boolean
        size?: "sm" | "md" | "lg"
        color?: "primary" | "gray" | "accent"
      }
    }
  | {
      id: string
      order: number
      type: "image"
      src: string
      alt: string
    }
  | {
      id: string
      order: number
      type: "code"
      language?: string
      code: string
      showLineNumbers?: boolean //行番号を表示するか？
    }
  | {
      id: string
      order: number
      type: "list"
      listStyle: "disc" | "decimal"
      items: ListItem[];
  }
