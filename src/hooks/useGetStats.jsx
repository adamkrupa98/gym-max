const useGetStats = (data) => {
  console.log(data);
  const maxRecordsByExercise = data.map((x) => {
    const MaxForExercise = x.details.reduce((max, current) => {
      const maxNumber = parseFloat(max.max);
      const currentNumber = parseFloat(current.max);
      return maxNumber > currentNumber ? max : current;
    }, x.details[0]);

    if (MaxForExercise === undefined) {
      return {
        id: x.id,
        exercise: x.exercise,

        details: [{ max: 0, date: 0 }],
      };
    }

    return {
      id: x.id,
      exercise: x.exercise,
      details: [MaxForExercise],
    };
  });

  const maxRecordsByExerciseCopy = Array.from(maxRecordsByExercise);

  const OldestByData = maxRecordsByExerciseCopy.reduce(
    (oldest, current) => {
      const currentMaxDate =
        current.details[0].date !== 0
          ? new Date(current.details[0].date)
          : null;
      const oldestMaxDate =
        oldest.details[0].date !== 0 ? new Date(oldest.details[0].date) : null;

      if (
        currentMaxDate !== null &&
        (oldestMaxDate === null || currentMaxDate < oldestMaxDate)
      ) {
        return current;
      } else {
        return oldest;
      }
    },
    maxRecordsByExerciseCopy[0] || { details: [{ date: 0 }] }
  );

  const oldest = OldestByData.details[0].date;
  const oldestResult = OldestByData.details[0].max;

  const NewestByData = maxRecordsByExercise.reduce(
    (newest, current) => {
      const currentDate = new Date(newest.details[0].date);
      const newestDate = new Date(current.details[0].date);
      return newestDate < currentDate ? newest : current;
    },
    maxRecordsByExercise[0] || { details: [{}] }
  );

  const newest = NewestByData.details[0].date;
  const newestResult = NewestByData.details[0].max;

  const maxWeight = maxRecordsByExercise.reduce(
    (max, current) => {
      max.details[0].max = parseFloat(max.details[0].max);
      current.details[0].max = parseFloat(current.details[0].max);

      return current.details[0].max >= max.details[0].max ? current : max;
    },
    maxRecordsByExercise[0] || { details: [{}] }
  );

  const max = maxWeight.details[0].max;
  const maxDate = maxWeight.details[0].date;

  const maxExercise = maxWeight.exercise;
  const newestExercise = NewestByData.exercise;
  const oldestExercise = OldestByData.exercise;
  return {
    max,
    oldest,
    newest,
    newestExercise,
    oldestExercise,
    maxExercise,
    maxDate,
    oldestResult,
    newestResult,
    maxRecordsByExercise,
  };
};

export default useGetStats;
