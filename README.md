# Assignment-Airtribe
## Problem Statement:
**Recursively crawl** [https://stackoverflow.com/questions](https://stackoverflow.com/questions) using Node.js based crawler, harvest all questions on Stack Overflow and store them in a database of your choice. 

What do you need to store?

1. Every unique URL (Stack Overflow question) you encountered.
2. The total reference count for every URL (How many time this URL was encountered).
3. Total # of upvotes and total # of answers for every question.
4. Dump the data in a CSV file when the user kills the script.

Things you should keep in mind:

1. Maintain a **concurrency of 5 requests** at all times. Refrain from using **throttled-request** package to limit concurrency.
2. Your solution needs to be **asynchronous** in nature.
3. If you are using **request.js**, do not use its connection pool to throttle # of requests. 
4. You can use cheerio or similar library for HTML parsing.

## My Approach:
I solved this problem using the following steps:
<ul>
<li> I pushed all the questions on the first page in an array. </li>
<li> Then, I iterated through the array usinf recursion and popped the urls from the array and saved it into the database along with it's url, number of upvotes, total answers and so on.</li>
<li> When the script is terminated, all the questions which are stored in the database is saved into a CSV File. </li>
</ul>

## <strong>Usage</strong>
<pre> <code>
  Fork the repository
  Open the terminal and write git clone https://github.com/<UserName>/Assignment-Airtribe.git
  cd Assignment-Airtribe
  npm install
  npm start
  </code>
</pre>
