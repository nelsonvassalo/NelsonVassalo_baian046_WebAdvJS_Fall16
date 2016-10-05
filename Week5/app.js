var Xray = require('x-ray'),
	fs = require('fs'),
	x = Xray(),
	express = require('express'),
	app = express(),
	PORT = 3000,
	baseURL = "http://genius.com/Mia-visa-lyrics";



x(baseURL, '.lyrics p a', [{
	words: x('lyrics p a')
}])
    .write('results.json');

app.listen(PORT, function() {
		console.log('Express server is running at ' + PORT);
})