import { supabase } from "./supabase";

export async function getExercisesByWorkoutDay(
  userId: number,
  workoutDay: string
) {

  const { data: workouts, error: workoutError } =
    await supabase
      .from("workouts")
      .select("id")
      .eq("user_id", userId)
      .eq("workout_day", workoutDay);

  if (workoutError || !workouts) {
    console.error(workoutError);
    return [];
  }

  const workoutIds =
    workouts.map((w) => w.id);

  if (workoutIds.length === 0) {
    return [];
  }

  const {
    data: exercises,
    error: exerciseError,
  } = await supabase
    .from("exercise_logs")
    .select("exercise_name")
    .in("workout_id", workoutIds);

  if (exerciseError || !exercises) {
    console.error(exerciseError);
    return [];
  }

  const uniqueExercises = [
    ...new Set(
      exercises.map(
        (e: any) => e.exercise_name
      )
    ),
  ];

  return uniqueExercises.sort();
}