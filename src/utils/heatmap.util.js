import { convertToAMPM } from "./time.helper";

export const transformDataForHeatmap = (data, bucketSize) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const bucketsPerDay = bucketSize;
  const dataByDayAndHour = {};

  data.forEach((timestamp) => {
    const date = new Date(timestamp);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hourOfDay = date.getHours();
    const bucketIndex = Math.floor((hourOfDay * bucketsPerDay) / 24);

    if (!dataByDayAndHour[dayOfWeek]) {
      dataByDayAndHour[dayOfWeek] = Array(bucketsPerDay).fill(0);
    }

    dataByDayAndHour[dayOfWeek][bucketIndex]++;
  });

  const transformedData = [];

  for (const dayOfWeek in dataByDayAndHour) {
    const dataPoints = dataByDayAndHour[dayOfWeek].map((value, index) => {
      let x = convertToAMPM(index);
      if (bucketsPerDay !== 24) {
        const bucketLength = 24 / bucketsPerDay;
        const currentEl = bucketLength * index;
        const start = convertToAMPM(currentEl);
        const end = convertToAMPM(currentEl + bucketLength);

        x = `${start} - ${end}`;
      }

      return {
        x,
        y: value,
      };
    });

    transformedData.push({
      name: dayOfWeek,
      data: dataPoints,
    });
  }

  return transformedData;
};

export const calculateColorRange = (dataset, colorOptions) => {
  const maxY = dataset.reduce((i, j) =>
    i > j.data.reduce((a, b) => (a.y > b.y ? a : b)).y
      ? i
      : j.data.reduce((a, b) => (a.y > b.y ? a : b)).y,
  );

  const minY = dataset.reduce((i, j) =>
    i < j.data.reduce((a, b) => (a.y < b.y ? a : b)).y
      ? i
      : j.data.reduce((a, b) => (a.y < b.y ? a : b)).y,
  );

  const newStep = Math.ceil(maxY / colorOptions.length);

  const updatedStructure = colorOptions.reduce((acc, item, index) => {
    const newFrom = index === 0 ? minY : acc[acc.length - 1].to;
    const newTo = index === 0 ? newStep : newFrom + newStep;
    acc.push({
      ...item,
      from: newFrom,
      to: newTo,
    });
    return acc;
  }, []);

  updatedStructure[updatedStructure.length - 1].to = maxY;

  return updatedStructure;
};
