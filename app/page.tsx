'use client'

import { useEffect } from "react"
import { supabase } from "@/src/lib/supabase"

const Home = () => {
  useEffect(() => {
    const test = async() => {
      const {data, error} = await supabase.from('posts').select('*')
      console.log(data, error);
    }
    test();
  }, [])

  return(
    <>
      <div>Supabase connected</div>
    </>
  )
}

export default Home
