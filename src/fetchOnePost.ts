import { supabase } from "./lib/supabase"
import { PostType } from "./type/postsType";


export const fetchOnePost = async(id:string):Promise<{data:PostType|null; error:Error|null; status?:number}> => {

  if(id === undefined || id === null) {
    return {data: null, error:new Error("id is required")}
  }

  const {data, error, status} = await supabase.from('posts').select('*').eq('id', id).single();

  if (error) {
    return {data: null, error: new Error(error.message), status}
  }

  return {data: data ?? null, error: null, status}
}
