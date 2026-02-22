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
