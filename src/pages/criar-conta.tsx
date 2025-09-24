import Head from "next/head";
import Link from "next/link";

export default function CriarContaPage() {
  return (
    <>
      <Head>
        <title>Criar conta • Coins for Study</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
            <p className="text-sm text-gray-500">Comece gratuitamente em poucos passos</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
              <input id="name" type="text" required placeholder="Seu nome" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <input id="email" type="email" required placeholder="seu@email.com" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <input id="password" type="password" required placeholder="••••••••" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm" className="text-sm font-medium">Confirmar senha</label>
              <input id="confirm" type="password" required placeholder="••••••••" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-md py-2 font-medium">Criar conta</button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Já tem conta? {" "}
            <Link href="/login" className="text-violet-600 hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  );
}
