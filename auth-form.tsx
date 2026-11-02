"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState("");
  const router = useRouter();
  const signup = mode === "signup";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    const supabase = createClient();
    const result = signup
      ? await supabase.auth.signUp({ email,password,options:{data:{full_name:name},emailRedirectTo:`${location.origin}/auth/callback`} })
      : await supabase.auth.signInWithPassword({ email,password });
    setBusy(false);
    if(result.error){setMessage(result.error.message);return;}
    if(signup && !result.data.session){setMessage("Conta criada! Verifique seu e-mail para confirmar o cadastro.");return;}
    router.push("/app"); router.refresh();
  }
  return <div className="auth-wrap"><div className="auth-card">
    <Link href="/" className="brand" style={{color:"#211b35",marginBottom:25}}><span className="brand-mark">C</span>ClienteFácil</Link>
    <h1 style={{fontSize:27,margin:"0 0 7px"}}>{signup?"Crie sua conta":"Bem-vindo de volta"}</h1>
    <p className="subtle">{signup?"Comece a organizar seus clientes.":"Entre para acessar seu negócio."}</p>
    <form onSubmit={submit} style={{marginTop:25}}>
      {signup&&<label className="field">Seu nome<input className="input" value={name} onChange={e=>setName(e.target.value)} required placeholder="Nome do responsável"/></label>}
      <label className="field">E-mail<input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="voce@email.com"/></label>
      <label className="field">Senha<input className="input" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Mínimo de 8 caracteres"/></label>
      {message&&<p style={{fontSize:13,color:message.includes("Verifique")?"#16794b":"#b42318"}}>{message}</p>}
      <button className="btn" disabled={busy} style={{width:"100%",marginTop:8}}>{busy?"Aguarde...":signup?"Criar conta":"Entrar"}</button>
    </form>
    <p className="subtle" style={{marginTop:22,textAlign:"center"}}>{signup?"Já tem uma conta? ":"Ainda não tem conta? "}<Link style={{color:"#6d4aff",fontWeight:700}} href={signup?"/login":"/cadastro"}>{signup?"Entrar":"Criar conta"}</Link></p>
  </div></div>;
}
