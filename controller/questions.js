questionURL = {
    FETCH_QUESTION_FROM_QUESTION_PAGE_SELECTOR:"h3>a.question-hyperlink",
    UPVOTE_COUNT_SELECTOR:"div[itemprop=upvoteCount]",
    NO_ANS_SELECTOR:"div.no-answers",
    NUMBER_OF_ANS_SELECTOR:"span[itemprop=answerCount]",
    RELETED_QUESTION_SELECTOR:"div>a.question-hyperlink"
};

const cheerio = require("cheerio");
const { Question } = require("../models/question");

const getAllQuestions = async (pageCount, callback) => {
    try {
        const response = await axios.get(`${process.env.HOST_QUESTION_ENDPOINT}?&page=${pageCount}`);
		const $ = cheerio.load(response.data);
        const links = $(crawlerConsts.FETCH_QUESTION_FROM_QUESTION_PAGE_SELECTOR)
			.map((i, link) => `${process.env.HOST_URL}${link.attribs.href}`)
			.get();
		callback(links);
    } catch (error) {
		setTaskInTasksQueue([]);
		console.log("Error occured in fetchQuestionsByPageNumber ", error);
	}
};