var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
	// The URL we will scrape from - in our example Anchorman 2.

	url = 'https://m.douban.com/time/column/85/?dt_time_source=douban-web_anonymous/';

	// The structure of our request call
	// The first parameter is our URL
	// The callback function takes 3 parameters, an error, response status code and the html

	request(url, function(error, response, html){

		// First we'll check to make sure no errors occurred when making the request

		if(!error){
			// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

			var $ = cheerio.load(html);

			// Finally, we'll define the variables we're going to capture

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};

			$('.i_OCT').filter(function(){
				var data = $(this);
				console.log(data);
				console.log('sss');
				title = data.text();
				json.title = title;
			});
			$('.star-box-giga-star').filter(function(){
				var data = $(this);

				// The .star-box-giga-star class was exactly where we wanted it to be.
				// To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

				rating = data.text();

				json.rating = rating;
			});
			fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

				console.log('File successfully written! - Check your project directory for the output.json file');

			})

			// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
			res.send('Check your console!')
		}
	})

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;