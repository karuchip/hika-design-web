"use client"
import { useState } from "react";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"

const schema = z.object({
  name: z.string().min(1, "正しい名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(10, "10文字以上で入力してください"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async(data: FormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(res.ok) {
        setSuccess(true);
        reset();
      }
    }catch(err) {
      console.error(err);
    }finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6 mt-30 text-center">お問い合わせ</h1>

      <p className="text-sm text-gray-500 mt-10 mb-10">
        ご入力いただいたメールアドレスは、お問い合わせ対応の目的のみに使用します。
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="お名前"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="メールアドレス"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("message")}
            placeholder="お問い合わせ内容"
            className="w-full border p-2 rounded h-32"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-500/50 text-white px-4 py-2 rounded"
          >
            {loading ? "送信中..." : "送信する"}
          </button>
        </div>

        {success && (
          <p className="text-indigo-500 text-center">送信が完了しました！お問合せいただきありがとうございます。</p>
        )}
      </form>
    </main>
  );
}
