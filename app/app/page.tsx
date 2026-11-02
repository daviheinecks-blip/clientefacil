import Link from "next/link";
import { Users, UserPlus, Bell, TrendingUp, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

function money(value:number){return value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}
export default async function Dashboard(){
  const supabase=await createClient();
  const [{count:clients},{data:reminders},{data:sales}] = await Promise.all([
    supabase.from("customers").select("*",{count:"exact",head:true}),
    supabase.from("reminders").select("id,title,due_at,customers(name)").eq("completed",false).order("due_at").limit(5),
    supabase.from("sales").select("amount").gte("created_at",new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString())
  ]);
  const total=(sales??[]).reduce((sum,row)=>sum+Number(row.amount),0);
  const stats=[{label:"Clientes cadastrados",value:String(clients??0),Icon:Users},{label:"Vendas neste mês",value:money(total),Icon:TrendingUp},{label:"Retornos pendentes",value:String(reminders?.length??0),Icon:Bell},{label:"Novos cadastros",value:"—",Icon:UserPlus}];
  return <><div><h1 className="page-title">Visão geral</h1><p className="subtle">Acompanhe o que está acontecendo no seu negócio.</p></div>
    <div className="grid-stats">{stats.map(({label,value,Icon})=><div className="card" key={label}><div className="card-head"><span className="stat-label">{label}</span><span className="stat-icon"><Icon size={19}/></span></div><div className="stat-value">{value}</div></div>)}</div>
    <div className="card"><div className="card-head"><div><div className="card-title">Próximos retornos</div><p className="subtle">Não deixe seus clientes esperando.</p></div><Link href="/app/lembretes" className="btn secondary">Ver todos <ArrowRight size={15}/></Link></div>
      {reminders?.length?<div className="table-wrap"><table><thead><tr><th>Lembrete</th><th>Cliente</th><th>Data</th></tr></thead><tbody>{reminders.map((r:any)=><tr key={r.id}><td>{r.title}</td><td>{r.customers?.name??"—"}</td><td>{new Date(r.due_at).toLocaleDateString("pt-BR")}</td></tr>)}</tbody></table></div>:<div className="empty">Você ainda não tem retornos pendentes. <Link href="/app/lembretes" style={{color:"#6d4aff"}}>Criar lembrete</Link></div>}
    </div>
    <div style={{marginTop:18,display:"flex",gap:10,flexWrap:"wrap"}}><Link className="btn" href="/app/clientes"> <UserPlus size={16}/> Gerenciar clientes</Link><Link className="btn secondary" href="/app/assinatura">Conhecer planos</Link></div>
  </>;
}
