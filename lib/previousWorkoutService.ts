import { supabase } from "./supabase";

export async function getPreviousExerciseData(
  userId: number,
  exerciseName: string
) {
  // 1. Find latest workout by this user

  const { data: workouts, error: workoutError } =
    await supabase
      .from("workouts")
      .select("id")
      .eq("user_id", userId)
      .order("workout_date", {
        ascending: false,
      });

  if (workoutError || !workouts) {
    console.error(workoutError);
    return [];
  }

  // 2. Search those workouts for this exercise

  for (const workout of workouts) {
    const {
      data: exerciseLog,
      error: exerciseError,
    } = await supabase
      .from("exercise_logs")
      .select("id")
      .eq("workout_id", workout.id)
      .eq("exercise_name", exerciseName)
      .maybeSingle();

    if (exerciseError) {
      console.error(exerciseError);
      continue;
    }

    if (!exerciseLog) {
      continue;
    }

    // 3. Get sets

    const {
      data: sets,
      error: setsError,
    } = await supabase
      .from("set_logs")
      .select("*")
      .eq("exercise_log_id", exerciseLog.id)
      .order("set_number");

    if (setsError) {
      console.error(setsError);
      return [];
    }

    return sets ?? [];
  }

  return [];
}