"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/src/lib/supabase"
import LogoutButton from "@/app/components/user/logoutbutton"
import { UsePost } from "@/src/hooks/usePost"


const DashboardClient = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
    getUser()
  }, [router])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h1 className="pt-30 text-[30px]">管理者画面</h1>

      <p className="pt-10 text-[24px]">・ユーザー</p>
      <LogoutButton/>

      <p className="pt-10 text-[24px]">・ブログ</p>
      <Link href="/blog/create">ブログ作成</Link>
    </>
  )
}

export default DashboardClient
