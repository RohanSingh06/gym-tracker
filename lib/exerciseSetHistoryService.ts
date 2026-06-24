import { supabase } from "./supabase";

export async function getExerciseHistory(
  userId: number,
  exerciseName: string
) {
  const { data: workouts, error: workoutError } =
    await supabase
      .from("workouts")
      .select("id, workout_date")
      .eq("user_id", userId);

  if (workoutError || !workouts) {
    console.error(workoutError);
    return [];
  }

  const workoutMap = new Map(
    workouts.map((workout) => [
      workout.id,
      workout.workout_date,
    ])
  );

  const workoutIds =
    workouts.map((workout) => workout.id);

  const {
    data: exerciseLogs,
    error: exerciseError,
  } = await supabase
    .from("exercise_logs")
    .select("id, workout_id")
    .eq("exercise_name", exerciseName)
    .in("workout_id", workoutIds);

  if (exerciseError || !exerciseLogs) {
    console.error(exerciseError);
    return [];
  }

  const history = [];

  for (const log of exerciseLogs) {
    const { data: sets } =
      await supabase
        .from("set_logs")
        .select("*")
        .eq("exercise_log_id", log.id)
        .order("set_number");

    history.push({
      workoutDate:
        workoutMap.get(log.workout_id),
      sets: sets ?? [],
    });
  }

  history.sort(
    (a, b) =>
      new Date(b.workoutDate).getTime() -
      new Date(a.workoutDate).getTime()
  );

  return history;
}