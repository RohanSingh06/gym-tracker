import { supabase } from "./supabase";

export async function getExerciseHistory(
  userId: number,
  exerciseName: string
) {

  console.log("USER:", userId);
  console.log("EXERCISE:", exerciseName);

  const { data: workouts, error: workoutError } =
    await supabase
      .from("workouts")
      .select("id, workout_date")
      .eq("user_id", userId);

  console.log("WORKOUTS:", workouts);

  if (workoutError || !workouts) {
    console.error("WORKOUT ERROR:", workoutError);
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
    .select("id, workout_id, exercise_name")
    .eq("exercise_name", exerciseName)
    .in("workout_id", workoutIds);

  console.log("EXERCISE LOGS:", exerciseLogs);

  if (exerciseError || !exerciseLogs) {
    console.error(
      "EXERCISE ERROR:",
      exerciseError
    );
    return [];
  }

  const history = [];

  for (const log of exerciseLogs) {

    const { data: sets, error: setError } =
      await supabase
        .from("set_logs")
        .select("*")
        .eq("exercise_log_id", log.id)
        .order("set_number");

    console.log(
      "SETS FOR",
      log.exercise_name,
      sets
    );

    if (setError) {
      console.error(setError);
      continue;
    }

    history.push({
      workoutDate:
        workoutMap.get(log.workout_id),
      sets: sets ?? [],
    });
  }

  console.log("FINAL HISTORY:", history);

  history.sort(
    (a, b) =>
      new Date(b.workoutDate).getTime() -
      new Date(a.workoutDate).getTime()
  );

  return history;
}