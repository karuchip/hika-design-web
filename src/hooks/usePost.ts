import { useEffect, useState } from "react"
import { PostType } from "../type/postsType"
import { fetchPosts } from "../fetchPosts";

export const UsePost = () => {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    let cancelled = false;

    const load = async () => {
      try{
        setLoading(true);
        setError(null);

        const {data, error: fetchError, status} = await fetchPosts();

        if(cancelled) return;

        if(fetchError) {
          if(status === 404) {
            setError("Posts not found");
            setPosts(null);
          } else {
            setError(fetchError.message);
            setPosts(null);
          }
        } else {
          setPosts(data);
        }
      } catch (e) {
        if(!cancelled) {
          setError(e instanceof Error ? e.message :String(e));
          setPosts(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {posts, loading, error};
}
