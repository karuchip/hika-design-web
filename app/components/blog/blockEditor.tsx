import { BlockType } from "@/src/type/postTypeBlocks"

type Props = {
  block: BlockType;
  index: number;
  updateBlock: (index: number, newData: Partial<BlockType>) => void;
  deleteBlock: (index: number) => void;
}

const BlockEditor = ({block, index, updateBlock, deleteBlock}: Props) => {

  if(block.type === "heading") {
    return(
      <div>
        <h3>見出し入力</h3>
        <label>
          <p>見出し</p>
          <input
            value={block.content}
            onChange={(e) => updateBlock(index, {content: e.target.value})}
          />
        </label>
        <label>
          <p>スタイル</p>
          <select
            value={block.level}
            onChange={(e) => updateBlock(index, {level: Number(e.target.value) as 1 | 2 | 3})}
          >
            <option value={1}>H1</option>
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
        </label>

        {/* 削除 */}
        <button onClick={()=>deleteBlock(index)}>削除</button>

      </div>
    )
  }
  if(block.type === "text") {
    return(
      <div>
        <h3>テキスト入力</h3>
        <label>
          <p>テキスト</p>
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(index, {content: e.target.value})}
          />
        </label>

        {/* 削除 */}
        <button onClick={()=>deleteBlock(index)}>削除</button>

      </div>
    )
  }
  if(block.type === "image") {
    return(
      <div>
        <h3>画像入力</h3>
        <label>
          <p>画像url</p>
          <input
            value={block.src}
            onChange={(e) => updateBlock(index, {src: e.target.value})}
          />
        </label>
        <label>
          <p>alt</p>
          <input
            value={block.alt}
            onChange={(e) => updateBlock(index, {alt: e.target.value})}
          />
        </label>

        {/* 削除 */}
        <button onClick={()=>deleteBlock(index)}>削除</button>

      </div>
    )
  }
  if(block.type === "code") {
    return(
      <div>
        <h3>コード入力</h3>
        <label>
          <p>コード</p>
          <textarea
            value={block.code}
            onChange={(e) => updateBlock(index, {code: e.target.value})}
          />
        </label>
        <label>
          <p>行番号表示する？</p>
          <select
            value={block.showLineNumbers ? "true" : "false"}
            onChange={(e) => updateBlock(index, {showLineNumbers: e.target.value === "true"})}
          >
            <option value="true">Show</option>
            <option value="false">Hidden</option>
          </select>
        </label>

        {/* 削除 */}
        <button onClick={()=>deleteBlock(index)}>削除</button>
      </div>
    )
  }
}

export default BlockEditor
