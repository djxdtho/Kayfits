import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveOrder(orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  city: string;
  state: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: string;
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  if (error) throw error;
  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
