import { supabase } from "./lib/supabase";
import { PostType } from "./type/postsType";


export const getAllPosts = async () => {
  const {data, error} = await supabase.from('posts').select('*');

  if(error) {
    console.error(error);
    return [];
  }

  return data as PostType[];
}
