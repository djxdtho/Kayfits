import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvsqnfevimlxjpekiqcs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c3FuZmV2aW1seGpwZWtpcWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzIwMTgsImV4cCI6MjA5MDk0ODAxOH0.8fL7Pi3FOYnnmX5XAXOgQ2tugZLvHkd0M3-yJTYDLzs';

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
