var app = app || {};

app.main = (function() {
	var tag = document.createElement('script');
	  tag.src = "https://www.youtube.com/player_api";
	  var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var load = function() {
		console.log("starting");
		$.ajax({
			url: "https://www.googleapis.com/youtube/v3/search",
			data: {
				q: "Eurodance 90s",
				part: "snippet",
				type: "video",
				maxResults: 20,
				videoEmbeddable: "true",
				key: "AIzaSyBRTggjoAYp6CF2pVsyR__wa6XSbnsxjEs",
				order: "viewCount"
			},
			success: function(response) {
				console.log(response.items);
				var results = response.items;
				shuffle(results);	
			},
			error: function() {
				console.log("nope")
			}
		})
	};

	var shuffle = function(data) {
		var windowH = $(window).height(),
			windowW = $(window).width(),
			posX = 0,
			posY = 0,
			elem = $(data[i]);


		for(var i=0; i<data.length; i++) {
			console.log(data[i].snippet.thumbnails.high.url);
			$('body').append("<div class='img' id='img-" + i + "'><img src='" + data[i].snippet.thumbnails.high.url + "' /></div>");

			
		}

		$.each(data, function(index) {
			$("#img-" + index)
				.stop()
				.delay(180)
				.animate({
					left: Math.random() * (windowW - 480),
					top: Math.random() * (windowH - 360)
			}, 250, function() {
				$("#img-" + index).append('<iframe class="yt" controls="0" enablejsapi id="ytplayer-' + index + '" type="text/html" width="480" height="360" src="https://www.youtube.com/embed/' + data[index].id.videoId +  '" frameborder="0"></iframe>')
			});
		})



	}
		

	var init = function() {
		load();
	}

	return {
		init: init
	};

})();




$(document).ready(function() {	
	app.main.init();
})