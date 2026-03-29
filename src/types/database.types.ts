export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bdi_configs: {
        Row: {
          admin_rate: number
          budget_id: string
          financial_cost_rate: number
          id: string
          profit_rate: number
          risk_rate: number
          tax_rate: number
          total_bdi_percent: number
        }
        Insert: {
          admin_rate?: number
          budget_id: string
          financial_cost_rate?: number
          id?: string
          profit_rate?: number
          risk_rate?: number
          tax_rate?: number
          total_bdi_percent?: number
        }
        Update: {
          admin_rate?: number
          budget_id?: string
          financial_cost_rate?: number
          id?: string
          profit_rate?: number
          risk_rate?: number
          tax_rate?: number
          total_bdi_percent?: number
        }
        Relationships: [
          {
            foreignKeyName: "bdi_configs_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: true
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_items: {
        Row: {
          budget_id: string
          composition_id: string
          id: string
          quantity: number
          sort_order: number
          total_cost: number
          unit_cost: number
        }
        Insert: {
          budget_id: string
          composition_id: string
          id?: string
          quantity: number
          sort_order?: number
          total_cost: number
          unit_cost: number
        }
        Update: {
          budget_id?: string
          composition_id?: string
          id?: string
          quantity?: number
          sort_order?: number
          total_cost?: number
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_budget_id_fkey"
            columns: ["budget_id"]
            isOneToOne: false
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budget_items_composition_id_fkey"
            columns: ["composition_id"]
            isOneToOne: false
            referencedRelation: "compositions"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          base_id: string
          created_at: string | null
          id: string
          is_desonerated: boolean
          price_reference_date: string | null
          project_id: string
          status: string
          total_bdi_value: number | null
          total_direct_cost: number | null
          total_sale_price: number | null
          updated_at: string | null
          validity_date: string | null
        }
        Insert: {
          base_id: string
          created_at?: string | null
          id?: string
          is_desonerated: boolean
          price_reference_date?: string | null
          project_id: string
          status?: string
          total_bdi_value?: number | null
          total_direct_cost?: number | null
          total_sale_price?: number | null
          updated_at?: string | null
          validity_date?: string | null
        }
        Update: {
          base_id?: string
          created_at?: string | null
          id?: string
          is_desonerated?: boolean
          price_reference_date?: string | null
          project_id?: string
          status?: string
          total_bdi_value?: number | null
          total_direct_cost?: number | null
          total_sale_price?: number | null
          updated_at?: string | null
          validity_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budgets_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "reference_bases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      composition_inputs: {
        Row: {
          coefficient: number
          composition_id: string
          id: string
          input_id: string
        }
        Insert: {
          coefficient: number
          composition_id: string
          id?: string
          input_id: string
        }
        Update: {
          coefficient?: number
          composition_id?: string
          id?: string
          input_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "composition_inputs_composition_id_fkey"
            columns: ["composition_id"]
            isOneToOne: false
            referencedRelation: "compositions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "composition_inputs_input_id_fkey"
            columns: ["input_id"]
            isOneToOne: false
            referencedRelation: "inputs"
            referencedColumns: ["id"]
          },
        ]
      }
      compositions: {
        Row: {
          base_id: string
          category: string | null
          code: string
          description: string
          id: string
          unit: string
          unit_cost: number
        }
        Insert: {
          base_id: string
          category?: string | null
          code: string
          description: string
          id?: string
          unit: string
          unit_cost: number
        }
        Update: {
          base_id?: string
          category?: string | null
          code?: string
          description?: string
          id?: string
          unit?: string
          unit_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "compositions_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "reference_bases"
            referencedColumns: ["id"]
          },
        ]
      }
      inputs: {
        Row: {
          base_id: string
          code: string
          description: string
          id: string
          type: string | null
          unit: string
          unit_price: number
        }
        Insert: {
          base_id: string
          code: string
          description: string
          id?: string
          type?: string | null
          unit: string
          unit_price: number
        }
        Update: {
          base_id?: string
          code?: string
          description?: string
          id?: string
          type?: string | null
          unit?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "inputs_base_id_fkey"
            columns: ["base_id"]
            isOneToOne: false
            referencedRelation: "reference_bases"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          address: string | null
          client_document: string | null
          client_name: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          client_document?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          client_document?: string | null
          client_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reference_bases: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          is_desonerated: boolean
          month_ref: string | null
          name: string
          published_at: string | null
          state: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          is_desonerated?: boolean
          month_ref?: string | null
          name: string
          published_at?: string | null
          state?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          is_desonerated?: boolean
          month_ref?: string | null
          name?: string
          published_at?: string | null
          state?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          cpf_cnpj: string | null
          crea_registration: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          cpf_cnpj?: string | null
          crea_registration?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          cpf_cnpj?: string | null
          crea_registration?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
