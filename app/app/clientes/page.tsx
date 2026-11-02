import Customers from "@/components/customers";
import { createClient } from "@/lib/supabase/server";
export default async function Clientes(){
  const supabase=await createClient();
  const {data}=await supabase.from("customers").select("*").order("created_at",{ascending:false});
  return <><h1 className="page-title">Clientes</h1><p className="subtle">Organize seus contatos e acompanhe o relacionamento.</p><div style={{marginTop:22}}><Customers initialCustomers={data??[]}/></div></>;
}
