export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          address: string
          branch_code: string
          branch_name: string
          id: string
          is_branch: boolean
          name: string | null
          tax_id: string
          zipcode: string
        }
        Insert: {
          address: string
          branch_code?: string
          branch_name?: string
          id?: string
          is_branch?: boolean
          name?: string | null
          tax_id: string
          zipcode: string
        }
        Update: {
          address?: string
          branch_code?: string
          branch_name?: string
          id?: string
          is_branch?: boolean
          name?: string | null
          tax_id?: string
          zipcode?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          price: number | null
          title: string | null
        }
        Insert: {
          id?: number
          price?: number | null
          title?: string | null
        }
        Update: {
          id?: number
          price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project: {
        Row: {
          detail: string | null
          price: number | null
          project_name: string
        }
        Insert: {
          detail?: string | null
          price?: number | null
          project_name: string
        }
        Update: {
          detail?: string | null
          price?: number | null
          project_name?: string
        }
        Relationships: []
      }
      quotations: {
        Row: {
          created_date: string
          currency: string | null
          customer_id: string | null
          doc_num: string
          grand_total: number | null
          project_name: string | null
          status: string | null
        }
        Insert: {
          created_date: string
          currency?: string | null
          customer_id?: string | null
          doc_num: string
          grand_total?: number | null
          project_name?: string | null
          status?: string | null
        }
        Update: {
          created_date?: string
          currency?: string | null
          customer_id?: string | null
          doc_num?: string
          grand_total?: number | null
          project_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_project_name_fkey"
            columns: ["project_name"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["project_name"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
