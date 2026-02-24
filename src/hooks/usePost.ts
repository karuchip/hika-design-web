import { useEffect, useState } from "react"
import { PostType } from "../type/postsType"
import { fetchPosts } from "../fetchPosts";

export const UsePost = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return {posts, loading};
}
