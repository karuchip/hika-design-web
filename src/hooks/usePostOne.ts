// ブログidをもとにpostsテーブルからレコードを1件取得

import { useState, useEffect } from "react";
import { PostType } from "../type/postsType";
import { fetchOnePost } from "../fetchOnePost";

export const usePostOne = (id?: string) => {
  const [onePost, setOnePost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if(id === undefined || id === null) {
      setOnePost(null);
      setError("no id provided");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError, status } = await fetchOnePost(id);

        if (cancelled) return;

        if (fetchError) {
          if (status === 404) {
            setError("Post not found");
            setOnePost(null);
          } else {
            setError(fetchError.message);
            setOnePost(null);
          }
        } else {
          setOnePost(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setOnePost(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {onePost, loading, error}
}
