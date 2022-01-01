const axios = require("axios");
const cheerio = require("cheerio");
const Question = require("../model/question");
const {
  name,
  questionURL,
  ans,
  n_ans,
  upvotes,
  related,
} = require("../HTMLAttributes");

exports.fetchQuestions = async (page, pushArray) => {
  try {
    const html = await axios.get(`${process.env.QUESTION_WEBSITE}${page}`);
    const $ = cheerio.load(html.data);
    const questions = $(`${questionURL}`)
      .map((i, link) => `${process.env.URL}${link.attribs.href}`)
      .get();
    pushArray(questions);
  } catch (error) {
    throw error;
  }
};

exports.questionData = async (url, page, pushArray) => {
  try {
    const data = {};
    data.url = url;
    const questionData = await axios.get(url);
    const $ = cheerio.load(questionData.data);
    const questionName = $(`${name}`).text();
    const numUpvotes = $(`${upvotes}`).text().trim().split(" ")[0].trim();
    let numAnswers = $(`${n_ans}`).text().trim().split(" ")[0].trim();
    if (numAnswers.length === 0) {
      numAnswers = $(`${ans}`).text();
    } else {
      numAnswers = 0;
    }
    data.name = questionName;
    data.upvotesCount = numUpvotes;
    data.totalAnswers = numAnswers;
    data.referenceCount = 1;
    const relatedQuestions = $(`${related}`)
      .map((i, link) => `${process.env.URL}${link.attribs.href}`)
      .get();
    if (relatedQuestions.length > 0) {
      pushArray(relatedQuestions);
    }
    await Question.create(data);
  } catch (error) {
    throw error;
  }
};
