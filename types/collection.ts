import { Database } from "./supabase";

export type QuotationDocNum = Database["public"]["Tables"]["quotations"]["Row"]["doc_num"]
export type Quotations = Database["public"]["Tables"]["quotations"]["Row"]
export type Projects = Database["public"]["Tables"]["project"]["Row"]
export type Customers = Database["public"]["Tables"]["customers"]["Row"]
