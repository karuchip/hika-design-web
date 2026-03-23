import { Suspense } from "react";
import BlogPreviewClient from "./BlogPreviewClient";
import Loading from "@/app/components/common/loading";

export default function Page() {
  return(
    <Suspense fallback={<Loading/>}>
      <BlogPreviewClient/>
    </Suspense>
  )
}
