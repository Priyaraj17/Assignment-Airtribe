const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "questionList.csv",
  header: [
    { id: "name", title: "NAME" },
    { id: "url", title: "URL" },
    { id: "upvotes", title: "Total Upvotes" },
    { id: "answers", title: "Total Answers" },
    { id: "reference", title: "Reference" },
  ],
});

exports.generateCsv = async (data) => {
  try {
    await csvWriter.writeRecords(data);
    console.log("CSV File is Ready");
  } catch (error) {
    console.log("Can't create a CSV", error);
  }
};
