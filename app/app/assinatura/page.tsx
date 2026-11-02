import { createClient } from "@/lib/supabase/server";
export default async function Conta(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 return <><h1 className="page-title">Minha conta</h1><p className="subtle">Gerencie seu acesso ao ClienteFácil.</p><div className="card" style={{marginTop:24}}><b>Conta cadastrada</b><p className="subtle" style={{marginTop:10}}>E-mail: {user?.email}</p><p className="subtle">O ClienteFácil está disponível sem cobrança e sem assinatura.</p></div></>;
}
