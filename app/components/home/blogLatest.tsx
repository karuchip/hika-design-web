import { PostListType } from "@/src/type/postListType";
import Bloggrid from "../blog/bloggrid";

export default function BlogLatest({posts}: {posts: PostListType[]}) {

 return(
  <Bloggrid posts={posts}/>
 )

}

