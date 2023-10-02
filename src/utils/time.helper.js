export const convertToAMPM = (time) => {
  const ampm = time >= 12 ? "PM" : "AM";
  const hourIn12HourFormat = time % 12 || 12;
  return `${hourIn12HourFormat} ${ampm}`;
};
