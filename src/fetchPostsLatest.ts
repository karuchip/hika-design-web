import { supabase } from "./lib/supabase";
import { PostListType } from "./type/postListType";



export const fetchPostLatest = async (): Promise<{data: PostListType[]|null; error:Error|null; status?:number}> => {
  const {data, error, status}
    = await supabase
      .from('posts')
      .select('id, created_at, title, topImage, category, published')
      .eq('published', true)
      .order('created_at', {ascending:false})
      .limit(6)

  if(error) {
    return {data: null, error: new Error(error.message), status};
  }

  return {data: data ?? null, error: null, status}
}
