import { supabase } from "./lib/supabase";
import { PostType } from "./type/postsType";


export const fetchPosts = async ():Promise<{data: PostType[]|null; error:Error|null; status?:number}> => {
  const {data, error, status} = await supabase.from('posts').select('*');

  if(error) {
    return {data: null, error: new Error(error.message), status};
  }

  return {data: data ?? null, error: null, status}
}
