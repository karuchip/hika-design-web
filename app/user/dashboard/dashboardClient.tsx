"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/src/lib/supabase"
import LogoutButton from "@/app/components/dashboard/logoutbutton"
import { UsePost } from "@/src/hooks/usePost"
import PostGridAdmin from "@/app/components/dashboard/bloggridadmin"


const DashboardClient = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  //投稿全件取得 カスタムフックの呼び出し
  const {posts, loading, error} = UsePost();

  // ログインチェック
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.log("ユーザーがいません")
        router.push("/user/login")
        return
      }
      setUser(user)
      setLoadingUser(false)
    }
    getUser()
  }, [router])


  if (loadingUser || loading) return <p>Loading...</p>

  return (
    <>
      <h1 className="pt-30 text-[30px]">管理者画面</h1>

      <p className="pt-10 text-[24px]">・ユーザー</p>
      <LogoutButton/>

      <p className="pt-10 text-[24px]">・ブログ</p>
      <Link href="/blog/create">ブログ作成</Link>

      <p className="pt-10 text-[24px]">・ブログ一覧</p>
      {error ? (
        <h3>Error: {error}</h3>
      ) : !posts ? (
        <h3>Posts not found</h3>
      ) : (
        <PostGridAdmin posts={posts}/>
      )}


    </>
  )
}

export default DashboardClient
