import { supabase } from "./supabase";

export async function getExerciseUsage(
  userId: number
) {
  const counts: Record<string, number> = {};

  // Get all workouts for this user

  const {
    data: workouts,
    error: workoutError,
  } = await supabase
    .from("workouts")
    .select("id")
    .eq("user_id", userId);

  if (workoutError || !workouts) {
    console.error(workoutError);
    return {};
  }

  const workoutIds = workouts.map(
    (workout) => workout.id
  );

  if (workoutIds.length === 0) {
    return {};
  }

  // Get exercise logs

  const {
    data: exerciseLogs,
    error: exerciseError,
  } = await supabase
    .from("exercise_logs")
    .select("exercise_name, workout_id")
    .in("workout_id", workoutIds);

  if (exerciseError || !exerciseLogs) {
    console.error(exerciseError);
    return {};
  }

  exerciseLogs.forEach((log) => {
    counts[log.exercise_name] =
      (counts[log.exercise_name] || 0) + 1;
  });

  return counts;
}