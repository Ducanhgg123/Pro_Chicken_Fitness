export function calculateAge(dateString) {
  if (dateString == null) return 20;
  // Parse the date string into a Date object
  const birthDate = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDiff = Date.now() - birthDate.getTime();

  // Convert the time difference to an age
  const ageDate = new Date(timeDiff); // Epoch reference
  const age = Math.abs(ageDate.getUTCFullYear() - 1970); // Subtract the birth year from the epoch year (1970)

  return age; // Return the calculated age
}
