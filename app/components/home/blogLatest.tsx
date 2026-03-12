import { UsePostLatest } from "@/src/hooks/usePostLatest"
import Loading from "../common/loading";
import Bloggrid from "../blog/bloggrid";

const BlogLatest = () => {

  // カスタムフックの呼び出し
  const {postLatest, loading, error} = UsePostLatest();

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <h3>Error: {error}</h3>
  }

  if (!postLatest) {
    return <h3>Posts not found</h3>
 }

 return(
  <Bloggrid posts={postLatest}/>
 )

}

export default BlogLatest
