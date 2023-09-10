function arrayToJason(text) {
  // Split the text into a string array using a regular expression to match commas and spaces
  const stringArray = text.split(/,|\s+/);

  // Filter out empty strings from the array
  const arr = stringArray.filter((str) => str.trim() !== "");

  console.log(arr);

  const weekDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let timeTable = {
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
  };
  //let timeTable= {}
  let isSubject = true;
  let timeData = [];
  let roomNo = "";
  let subject = "";
  let section = "";
  let i = 0;
  const myRegex = /#\d+/;
  const regexPattern = /^#(\d+)$/;
  arr.forEach((element) => {
    if (weekDays.includes(element)) {
      if (i == 0) {
        i++;
      } else {
        timeTable[weekDays[i - 1]] = timeData;
        timeData = [];
        i++;
      }
    } else {
      if (isSubject) {
        subject = element;
        isSubject = false;
      } else if (!myRegex.test(element) && !isSubject) {
        section = element;
      } else {
        roomNo = element.replace(regexPattern, "$1");
        isSubject = true;
        let obj = {
          subject: subject,
          roomNo: roomNo,
          section: section,
        };
        timeData.push(obj);
        section = "";
      }
    }

  });
  //console.log(timeTable);
  return timeTable
}

