"use server"
import { SBServerClient } from "@/utils/server/supabase";
import { cookies } from "next/headers";

export async function getPaginatedQuotations(
  page: number = 1,
  itemsPerPage: number = 10
) {
  "use server";
  const superbase = SBServerClient(cookies());
  const count =
    (
      await superbase
        .from("quotations")
        .select("*", { count: "exact", head: true })
    ).count ?? 0;

  const data = await superbase
    .from("quotations")
    .select(
      `doc_num,
        created_date,
        status,
        currency,
        project_name,
        grand_total,
        customers(id, name)`
    )
    .order("doc_num", { ascending: false, })
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

  const totalPage = Math.ceil(count / itemsPerPage);

  return {
    list: data.data || [],
    count: count,
    page: page,
    totalPage: totalPage,
    itemsPerPage: itemsPerPage,
  };
}

export type PaginatedQuotationFn = typeof getPaginatedQuotations;
