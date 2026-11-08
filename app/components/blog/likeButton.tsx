'use client';

import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネントマウント時に localStorage をチェック
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
    if (likedPosts.includes(postId)) {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);

    // 楽観的UI更新（即座に画面をカウントアップ＆ハートを赤に）
    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true);

    // localStorage に保存
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
    localStorage.setItem('liked_posts', JSON.stringify([...likedPosts, postId]));

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to like');
      }

      const data = await res.json();
      // サーバー側の正確な値で同期
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
      // エラー時はロールバック
      setLikes(likes);
      setHasLiked(false);
      const filteredPosts = likedPosts.filter((id: string) => id !== postId);
      localStorage.setItem('liked_posts', JSON.stringify(filteredPosts));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      className={`group flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 border ${
        hasLiked
          ? 'bg-pink-50 border-pink-200 text-pink-600 cursor-default shadow-sm'
          : 'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 text-gray-700 hover:text-pink-600 shadow-sm'
      }`}
    >
      {/* いいね状態によってアイコンを切り替え ＆ ホバー時やクリック時のぴょこっとするアニメーション */}
      <span className="transition-transform duration-200 group-hover:scale-110">
        {hasLiked ? (
          <FavoriteIcon className="text-pink-500 text-xl" />
        ) : (
          <FavoriteBorderIcon className="text-gray-400 group-hover:text-pink-500 text-xl" />
        )}
      </span>
      <span className="font-semibold text-sm">{likes}</span>
    </button>
  );
}
