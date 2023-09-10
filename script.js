function parseTimetable(inputData) {
  // Split input data into lines
  const lines = inputData.trim().split("\n");

  // Initialize the result object (timetable dictionary)
  const timetableDict = {};

  // Initialize variables to keep track of the current day and subject/room details
  let currentDay = null;
  let subjectRoomDetails = [];

  // Define a regular expression pattern to match the days of the week
  const dayPattern = /^(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)$/;

  // Loop through each line
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine) {
      // Check if the line contains a day of the week using regular expression
      const match = trimmedLine.match(dayPattern);
      if (match) {
        // If a day is found, set it as the currentDay
        currentDay = match[0];
        subjectRoomDetails = []; // Initialize subject/room details for the day
      } else if (trimmedLine === "Consultancy Hours" || trimmedLine === "LUNCH") {
        // Update the room number to "#0" for special cases
        subjectRoomDetails.push([trimmedLine, "#0"]);
      } else {
        // Extract subject and room information
        const parts = trimmedLine.split("#");
        if (parts.length >= 2) {
          const subject = parts[0].trim();
          const room = "#" + parts[1].trim();
          subjectRoomDetails.push([subject, room]);
        }
      }
    }

    // Add the subject/room details to the object for the current day
    if (currentDay) {
      timetableDict[currentDay] = subjectRoomDetails;
    }
  }

  // Convert the result object to a JSON string (not included in the original Python code)
  return JSON.stringify(timetableDict);
}

// Example usage (not included in the original Python code):
const input_data = `
MONDAY
Math#101
Science#102
Consultancy Hours
LUNCH
TUESDAY
English#103
`;

const timetableString = parseTimetable(input_data);
console.log(timetableString);
