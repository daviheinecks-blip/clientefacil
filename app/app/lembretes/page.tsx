import Reminders from "@/components/reminders";
import { createClient } from "@/lib/supabase/server";
export default async function Lembretes(){
 const supabase=await createClient();
 const [{data:reminders},{data:customers}]=await Promise.all([
  supabase.from("reminders").select("*,customers(name)").order("due_at"),
  supabase.from("customers").select("id,name").order("name")
 ]);
 return <><h1 className="page-title">Lembretes</h1><p className="subtle">Organize retornos, acompanhamentos e próximos contatos.</p><div style={{marginTop:22}}><Reminders initialReminders={reminders??[]} customers={customers??[]}/></div></>;
}
