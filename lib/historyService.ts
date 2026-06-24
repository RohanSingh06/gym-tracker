import { supabase } from "./supabase";

export async function getWorkoutHistory(userId: number) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .order("workout_date", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}