"use client"
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if(error) {
      console.error(error);
      setErrorMessage("ログインに失敗しました")
      setLoading(false);
      return;
    }

    alert("ログイン成功");
    setLoading(false);
    router.push("/user/dashboard")
  }

  return(
    <>
      <h2 className="pt-30">ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  )
}

export default Login
