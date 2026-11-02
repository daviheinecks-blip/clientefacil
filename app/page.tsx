import Link from "next/link";
import { ArrowRight, Users, CalendarCheck, MessageCircle, ChartNoAxesCombined } from "lucide-react";

export default function Home() {
  return <main style={{minHeight:"100vh",background:"linear-gradient(135deg,#21183d 0%,#35245f 55%,#6d4aff 100%)",color:"white"}}>
    <nav style={{maxWidth:1150,margin:"auto",padding:"25px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div className="brand"><span className="brand-mark">C</span>ClienteFácil</div>
      <div style={{display:"flex",gap:12,alignItems:"center"}}><Link href="/login">Entrar</Link><Link className="btn" href="/cadastro">Começar grátis <ArrowRight size={16}/></Link></div>
    </nav>
    <section style={{maxWidth:1150,margin:"auto",padding:"90px 24px 100px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:55,alignItems:"center"}}>
      <div><div className="pill" style={{background:"#4c3c78",color:"#e5ddff"}}>GESTÃO SIMPLES PARA PEQUENOS NEGÓCIOS</div>
        <h1 style={{fontSize:"clamp(42px,6vw,66px)",lineHeight:1.04,letterSpacing:-2.5,margin:"22px 0"}}>Seus clientes.<br/>Seu negócio.<br/><span style={{color:"#b9aaff"}}>Tudo organizado.</span></h1>
        <p style={{color:"#d2cbe3",fontSize:18,lineHeight:1.7,maxWidth:520}}>Gerencie contatos, acompanhe vendas e lembre-se de falar com cada cliente na hora certa. Sem planilhas complicadas.</p>
        <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}><Link className="btn" href="/cadastro">Criar minha conta <ArrowRight size={16}/></Link><Link className="btn secondary" href="/login">Já tenho conta</Link></div>
      </div>
      <div className="card" style={{color:"#211b35",padding:25,transform:"rotate(1deg)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b>Visão geral</b><span className="pill">Este mês</span></div>
        <div className="grid-stats" style={{gridTemplateColumns:"1fr 1fr"}}>
          <div><div className="stat-label">Clientes</div><div className="stat-value">248</div></div>
          <div><div className="stat-label">Vendas</div><div className="stat-value">R$ 8,4 mil</div></div>
        </div>
        <div style={{background:"#f7f5fc",borderRadius:14,padding:17}}><b>Próximos retornos</b>{["Ana Souza · hoje","Marcos Lima · amanhã","Julia Costa · sexta"].map(x=><div key={x} style={{padding:"13px 0",borderBottom:"1px solid #eae6f2",fontSize:13}}>{x}</div>)}</div>
        <p className="subtle" style={{marginBottom:0}}>Prévia ilustrativa do produto.</p>
      </div>
    </section>
    <section style={{background:"white",color:"#211b35",padding:"55px 24px"}}>
      <div style={{maxWidth:1100,margin:"auto"}}><h2 style={{fontSize:32,textAlign:"center"}}>Tudo que você precisa para cuidar dos seus clientes</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:18,marginTop:35}}>
          {[[Users,"Cadastro de clientes","Contatos e informações em um só lugar."],[CalendarCheck,"Lembretes","Saiba quem precisa de um retorno."],[MessageCircle,"WhatsApp","Abra a conversa com um clique."],[ChartNoAxesCombined,"Acompanhamento","Veja seus clientes e vendas." ]].map(([Icon,title,desc]:any)=><div className="card" key={title}><Icon color="#6d4aff" size={25}/><h3>{title}</h3><p className="subtle">{desc}</p></div>)}
        </div>
      </div>
    </section>
    <footer style={{padding:25,textAlign:"center",color:"#d2cbe3"}}>© {new Date().getFullYear()} ClienteFácil</footer>
  </main>;
}
