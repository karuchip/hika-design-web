import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/src/lib/supabase';

// 型定義（Next.jsのバージョンや設定に合わせて調整してください）
type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Props) {
  // ① params を必ず await して展開する
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  // ここでログを出して、ちゃんとただの文字列（UUID）になっているか確認できます
  console.log('Received postId:', postId);

  try {
    const { data, error } = await supabase.rpc('increment_likes', {
      post_id: postId, // ここは文字列のUUIDが渡るべき
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      likes: data ?? 0
    });

  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}
