import { BlockType, ListItem } from "@/src/type/postTypeBlocks"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


type Props = {
  block: BlockType;
  index: number;
  updateBlock: (index: number, newData: Partial<BlockType>) => void;
  deleteBlock: (index: number) => void;
}

const BlockEditor = ({block, index, updateBlock, deleteBlock}: Props) => {

  // リスト　行追加処理
  const addListItem = (index:number, block:BlockType) => {
    if(block.type === "list") {
      const newOrder = block.items.length + 1;
      const newItem :ListItem = {
        id: crypto.randomUUID(),
        text: "",
        order: newOrder
      };
      updateBlock(
        index,
        {
          ...block,
          items: [...block.items, newItem]
        }
      )
    }
  }

  // リスト　変更処理
  const updateListItem = (itemIndex:number, newItemText:string, block:BlockType) => {
    if (block.type === "list") {

      const newItems = block.items.map((item, idx) => {
        if(idx === itemIndex) {
          return {...item, text: newItemText}
        }
        return item;
      })
      updateBlock(
        block.order,
        {
        ...block,
        items: newItems,
      })
    }
  }

  if(block.type === "heading") {

    if (block.level === 1) {
      return(

        <div className="mt-[30px] md:mt-[50px] mb-[20px] flex gap-3 content-center">
          <label className="flex-1">
            <input
              value={block.content}
              onChange={(e) => updateBlock(index, {content: e.target.value})}
              placeholder="見出し1"
              className="bg-[#F7F7F7] p-3 font-bold text-[22px] md:text-[30px] w-full"
            />
            <div className="w-full h-[1px] bg-[#AFAFAF]">
              <span></span>
            </div>
          </label>
          {/* 削除 */}
          <button onClick={()=>deleteBlock(index)} className="flex-none"><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>
        </div>
      )
    } else if (block.level === 2) {
      return(
        <div className="mt-[20px] mb-[10px] mt-[20px] md:mt-[40px] md:mb-[20px] flex gap-3 content-center">
          <label className="flex-1">
            <input
              value={block.content}
              onChange={(e) => updateBlock(index, {content: e.target.value})}
              placeholder="見出し2"
              className="bg-[#F7F7F7] p-3 w-full font-bold text-[18px] md:text-[22px]"
            />
          </label>
          {/* 削除 */}
          <button className="flex-none" onClick={()=>deleteBlock(index)}><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>
        </div>
      )
    } else if (block.level === 3) {
      return(
        <div className="flex gap-3 content-center">
          <label className="flex-1 mt-[5px] md:mt-[10px] mb-[5px] md:mb-[10px] ">
            <input
              value={block.content}
              onChange={(e) => updateBlock(index, {content: e.target.value})}
              placeholder="見出し3"
              className="bg-[#F7F7F7] p-3 w-full font-bold text-[16px] md:text-[18px]"
            />
          </label>
            {/* 削除 */}
          <button className="flex-none" onClick={()=>deleteBlock(index)}><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>
        </div>
      )
    }
  }
  if(block.type === "text") {
    return(
      <div className="flex gap-3 content-center">
        <label className="flex-1 grid mt-[5px] md:mt-[10px] mb-[5px] md:mb-[10px] ">
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(index, {content: e.target.value})}
            placeholder="テキスト入力"
            className="w-full bg-[#F7F7F7] p-3"
          />
        </label>

        {/* 削除 */}
        <button className="flex-none" onClick={()=>deleteBlock(index)}><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>

      </div>
    )
  }
  if(block.type === "image") {
    return(
      <div className="mt-[30px] mb-[20px] flex gap-3 content-center my-[20px] md:my-[30px] ">
        <label className="flex-1">
          <input
            value={block.src}
            onChange={(e) => updateBlock(index, {src: e.target.value})}
            placeholder="画像アップロード先URL"
            className="bg-[#F7F7F7] p-3 w-full"
          />
        </label>
        <label>
          <input
            value={block.alt}
            onChange={(e) => updateBlock(index, {alt: e.target.value})}
            placeholder="alt"
            className="bg-[#F7F7F7] p-3 w-full"
          />
        </label>

        {/* 削除 */}
        <button className="flex-none" onClick={()=>deleteBlock(index)}><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>

      </div>
    )
  }
  if(block.type === "code") {
    return(
      <div className="mt-[30px] mb-[20px] flex gap-3 content-center my-[20px] md:my-[30px] ">
        <label className="flex-1">
          <textarea
            value={block.code}
            onChange={(e) => updateBlock(index, {code: e.target.value})}
            placeholder="コードを入力..."
            className="bg-[#1e1e1e] w-full text-white p-6 rounded-lg overflow-x-auto"
          />
        </label>


        {/* <label>
          <p>行番号表示する？</p>
          <select
            value={block.showLineNumbers ? "true" : "false"}
            onChange={(e) => updateBlock(index, {showLineNumbers: e.target.value === "true"})}
          >
            <option value="true">Show</option>
            <option value="false">Hidden</option>
          </select>
        </label> */}

        {/* 削除 */}
        <button className="flex-none" onClick={()=>deleteBlock(index)}><DeleteOutlineIcon sx={{fontSize:"large"}}/></button>
      </div>
    )
  }
  if(block.type === "list") {
    return(
      <div>
        <button onClick={() => addListItem(index, block)}>行を追加</button>

        <select
          value={block.listStyle}
          onChange={(e)=>updateBlock(index, {listStyle: e.target.value as "disc" | "decimal"})}
          className="p-3 bg-[#F7F7F7] w-[180px] text-[20px]"
        >
          <option value={"decimal"}>decimal</option>
          <option value={"disc"}>disc</option>
        </select>

        <label>
          {[...block.items]
            .sort((a,b) => a.order - b.order)
            .map((item, itemIndex) => {
            return (
              <div key={item.id || itemIndex} className="flex items-center gap-2 mb-1">
                {/* ここで listStyle に応じて表示を切り替える！ */}
                <span className="w-6 text-center shrink-0">
                  {block.listStyle === "decimal"
                    ? `${itemIndex + 1}.` // 数字の場合： 1. 2. 3.
                    : "•"                 // 黒丸の場合： ・
                  }
                </span>

                <input
                  value={item.text}
                  className="bg-[#C36782] outline-none px-2 py-1 rounded w-full"
                  onChange={(e) => updateListItem(itemIndex, e.target.value, block)}
                  placeholder="リスト項目を入力..."
                />
              </div>
            );
          })}
        </label>
      </div>
    )
  }
}

export default BlockEditor
