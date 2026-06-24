import { supabase } from "./supabase";

type User = {
  full_name: string;
  phone_number: string;
  password: string;
};

export async function createUser(user: User) {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select()
    .single();

  if (error) {
    console.error("Create User Error:", error);
    return null;
  }

  console.log("User Created:", data);

  return data;
}

export async function loginUser(
  phoneNumber: string,
  password: string
) {
  console.log("Attempting login for:", phoneNumber);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone_number", phoneNumber)
    .eq("password", password)
    .maybeSingle();

  console.log("Supabase Response:", data);
  console.log("Supabase Error:", error);

  if (error) {
    return null;
  }

  return data;
}