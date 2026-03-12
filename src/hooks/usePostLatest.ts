import { useEffect, useState } from "react";
import { PostListType } from "../type/postListType"
import { fetchPostLatest } from "../fetchPostsLatest";

export const UsePostLatest = () => {
  const [postLatest, setPostLatest] = useState<PostListType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    let cancelled = false;

    const load = async() => {
      try{
        setLoading(true);
        setError(null);

        const {data, error: fetchError, status} = await fetchPostLatest();

        if(cancelled) return;

        if(fetchError) {
          if(status === 404) {
            setError("Posts not found") ;
            setPostLatest(null);
          } else {
            setError(fetchError.message);
            setPostLatest(null);
          }
        }else {
          setPostLatest(data);
        }
      } catch(e) {
        if(!cancelled) {
          setError(e instanceof Error ? e.message :String(e));
          setPostLatest(null);
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    };

    load();
    return () => {
      cancelled = true;
    }
  }, []);

  return {postLatest, loading, error};
}
