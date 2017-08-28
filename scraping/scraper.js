const cheerio = require('cheerio');
const rp = require('request-promise-native');

const options = {
    uri: 'http://jsfeeds.com/',
    transform: body => cheerio.load(body)
};

const scrape = callback => {
	rp(options).then( ($) => {
		const data = [];
		$("div.article").each((i, element) => {
			const header = $(element).find('h3').find('a');
			const body = $(element).find('div.col-md-18').text().split(' ... ')[0] + ' ... ';

			data.push({
				title: $(header).text().trim(),
				body: body,
				link: 'http://jsfeeds.com' + $(header).attr("href")
			})
		});
		console.log('Scraped.')
		data.forEach(e => console.log(e.title))
		callback(data)
	}).catch(err => console.log(err))
}

module.exports = scrape;