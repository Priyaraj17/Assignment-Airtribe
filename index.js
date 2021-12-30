const { response } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

require("./db");
const fetchQuestions = async (page) => {
  try {
    const html = await axios.get(
      `${process.env.HOST_QUESTION_ENDPOINT}?&page=${page}`
    );
    const $ = cheerio.load(html.data);
    const questions = $("h3>a.question-hyperlink")
      .map((i, link) => `${process.env.HOST_URL}${link.attribs.href}`)
      .get();
    console.log(questions);
  } catch (error) {
    throw error;
  }
};

// fetchQuestions(1);
const data = {};
const questionData = async (url, page) => {
  try {
    data.url = url;
    const questionData = await axios.get(url);
    const $ = cheerio.load(questionData.data);
    const questionName = $("h1[itemprop=name]").text();
    const numUpvotes = $(".js-vote-count").text().trim().split(" ")[0].trim();
    let numAnswers = $("div.no-answers").text().trim().split(" ")[0].trim();
    if (numAnswers.length === 0) {
      numAnswers = $("span[itemprop=answerCount]").text();
    }
    console.log(questionName);
    console.log(numUpvotes);
    console.log(numAnswers);
  } catch (error) {
    throw error;
  }
};

questionData(
  "https://stackoverflow.com/questions/2809/sql-server-2000-is-there-a-way-to-tell-when-a-record-was-last-modified",
  1
);
