import { supabase } from "./lib/supabase";

export const incrementViewCount = async (
  id: string
) => {
  const {data, error} = await supabase.rpc(
    "increment_post_view_count",
    {
      post_id: id,
    }
  );

  if(error) {
    throw error;
  }

  return data;
}
