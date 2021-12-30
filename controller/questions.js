const axios = require("axios");
const cheerio = require("cheerio");
const Question = require("../model/question");

exports.fetchQuestions = async (page, pushArray) => {
  try {
    const html = await axios.get(
      `${process.env.HOST_QUESTION_ENDPOINT}?&page=${page}`
    );
    const $ = cheerio.load(html.data);
    const questions = $("h3>a.question-hyperlink")
      .map((i, link) => `${process.env.HOST_URL}${link.attribs.href}`)
      .get();
    pushArray(questions);
  } catch (error) {
    throw error;
  }
};

exports.questionData = async (url, page) => {
  try {
    const data = {};
    data.url = url;
    const questionData = await axios.get(url);
    const $ = cheerio.load(questionData.data);
    const questionName = $("h1[itemprop=name]").text();
    const numUpvotes = $(".js-vote-count").text().trim().split(" ")[0].trim();
    let numAnswers = $("div.no-answers").text().trim().split(" ")[0].trim();
    if (numAnswers.length === 0) {
      numAnswers = $("span[itemprop=answerCount]").text();
    }
    data.name = questionName;
    data.upvotesCount = numUpvotes;
    data.totalAnswers = numAnswers;
    data.referenceCount = 1;
    await Question.create(data);
  } catch (error) {
    throw error;
  }
};
