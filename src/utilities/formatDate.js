import moment from "moment";

export const formattedDate = (dateString) => {
  // Parse the given date string using Moment.js
  const date = moment(dateString || moment.now());

  // Calculate the difference between the date and the current time
  const timeAgo = date.fromNow();

  return `Posted ${timeAgo}`;
};

export function formatVietnameseDate(inputDate) {
  const formattedDate = moment(inputDate).format("DD/MM/YYYY");
  return formattedDate;
}
