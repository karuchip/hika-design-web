// ViewCount.tsx
"use client";

import { useEffect } from "react";
import { incrementViewCount } from "@/src/incrementViewCount";

export default function ViewCount({ id }: { id: string }) {
  useEffect(() => {
    incrementViewCount(id).catch(console.error);
  }, [id]);

  return null;
}
