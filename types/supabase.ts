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
          created_at: string
          customer_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          customer_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          customer_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          customer_id: string | null
          detail: string | null
          price: number | null
          project_name: string
        }
        Insert: {
          customer_id?: string | null
          detail?: string | null
          price?: number | null
          project_name: string
        }
        Update: {
          customer_id?: string | null
          detail?: string | null
          price?: number | null
          project_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
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
