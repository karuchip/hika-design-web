import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async() => {
    const {error} = await supabase.auth.signOut();

    if(error) {
      console.error(error);
      alert("ログアウト失敗");
      return;
    }

    alert("ログアウトしました");
    router.push("/user/login")
  }

  return(
    <button onClick={()=>handleLogout()}>
      ログアウト
    </button>
  )
}

export default LogoutButton
