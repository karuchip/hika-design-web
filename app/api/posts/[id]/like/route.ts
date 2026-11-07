import { supabase } from "@/src/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {params}: {params: {id:string}}
){

  console.log("API呼び出されました")
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  console.log('Received postId:', postId);

  try {
    const {data, error} = await supabase.rpc('increment_likes', {
      post_id: postId,
    });

    if(error) console.error(error)
    if(error) throw error;

    // 最新のいいね数を取得して返す
    const {data: postData} = await supabase
      .from('posts')
      .select('likes')
      .eq('id', postId)
      .single();

    return NextResponse.json({
      success: true,
      likes: postData?.likes ?? 0
    });

  }catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      {success: false, error: 'Failed to update likes'},
      {status: 500}
    )
  }
}
