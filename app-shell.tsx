"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Bell, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const items = [{href:"/app",label:"Visão geral",Icon:LayoutDashboard},{href:"/app/clientes",label:"Clientes",Icon:Users},{href:"/app/lembretes",label:"Lembretes",Icon:Bell}];
export default function AppShell({children,email}:{children:React.ReactNode,email:string}) {
  const path=usePathname(); const router=useRouter();
  async function logout(){const supabase=createClient();await supabase.auth.signOut();router.push("/login");router.refresh();}
  return <div className="shell">
    <aside className="sidebar"><Link href="/app" className="brand"><span className="brand-mark">C</span>ClienteFácil</Link><nav className="nav">{items.map(({href,label,Icon})=><Link key={href} href={href} className={path===href?"active":""}><Icon size={18}/>{label}</Link>)}</nav><div className="side-bottom"><div>{email}</div><button onClick={logout} className="btn secondary" style={{marginTop:14,width:"100%"}}><LogOut size={15}/> Sair</button><p>Organize relacionamentos. Faça seu negócio crescer.</p></div></aside>
    <div className="main"><header className="topbar"><div style={{fontWeight:700}}>Painel do negócio</div><div className="top-action subtle">{email}</div></header><main className="content">{children}</main>
      <nav className="mobile-nav">{items.map(({href,label,Icon})=><Link key={href} href={href} className={path===href?"active":""}><Icon size={19}/>{label}</Link>)}</nav>
    </div>
  </div>;
}
