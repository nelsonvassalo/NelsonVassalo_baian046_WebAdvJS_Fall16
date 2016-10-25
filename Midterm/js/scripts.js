var app = app || {};

app.main = (function() {
	var images = {},
		countries = {},
		buttons = $('.filters li a');

	function data() {
		$.getJSON("../images.json", function(data) {
			images = data;
			imagesHTML(images);
			$(window).trigger('hashchange');
		});
	}

	function render(url) {
		 var temp = url.split('/')[0];

		$('.main-content').removeClass('visible');

		var	map = {
			'': function() {
				countries = {};
				renderList(images);
			},

			'#cartoon': function() {
				var index = url.split('#cartoon/')[1].trim();
				

				renderSingle(index, images);
			},

			// Page with filtered students
			'#countries': function() {
				// Grab the string after the '#filter/' keyword. Call the filtering function.
				 url = url.split('#countries/')[1].trim();

				 try {
					countries = JSON.parse(url);
				}
				// If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
				catch(err) {
					window.location.hash = '#';
					return;
				}

				// Try and parse the filters object from the query string.
				renderFilters(countries, images);
			}


		};
		map[temp]();


	}

	function imagesHTML(data) {
		var container = $('.gallery');

		var handle = $("#gallery-items").html();
		var template = Handlebars.compile(handle);
		container.append(template(data));


		container.find('li').click(function (e) {
			
			e.preventDefault();
			var cartoonIndex = $(this).data('index');
			window.location.hash = 'cartoon/' + cartoonIndex;
		})

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		container.addClass('visible');

	}

	function renderList(data){
		console.log(data);
		var page = $('.gallery'),
			eachImage = $('.gallery > li');

		// Hide all the students in the students list.
		eachImage.addClass('hidden');

		// Iterate over all of the students.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		eachImage.each(function () {

			var that = $(this);

			data.forEach(function (item, index) {
				alert(data, item, index);
				if(that.data('index') == item.index){
					that.removeClass('hidden');
				}
			});
		});
	}



	function renderSingle(index, data){
		var page = $('.cartoon'),
			container = $('.main');




		if(data.length){
			data.forEach(function (item, currentValue) {
				if(currentValue == index){
					console.log(item, currentValue, index, item);
					container.find('h3').text(item.title);
					container.find('img').attr('src', item.thumbnail);
					container.find('p').text(item.info);
				}
			});
			page.addClass('visible');
		};
	}

	function hashing(countries){
		if(!$.isEmptyObject(countries)){
			window.location.hash = '#countries/' + JSON.stringify(countries);
		}
		else{
			window.location.hash = '#';
		}
	}

	function renderFilters(countries, images){

			// This array contains all the possible filter criteria.
		var scope = ['portugal, all, greece, ireland, france, germany, spain, italy'],
			results = [],
			isFiltered = false;

		criteria.forEach(function (a) {

			// Check if each of the possible filter criteria is actually in the filters object.
			if(countries[a] && countries[a].length){

				if(isFiltered){
					images = results;
					results = [];
				}



				countries[c].forEach(function (countries) {
					console.log(countries[a]);
					// Iterate over the students.
					countries.forEach(function (item){

						// If the project has the same specification value as the one in the filter
						// push it inside the results array and mark the isFiltered flag true.

						if(typeof item.countries[a] == 'string'){
							if(item.countries[a].indexOf(countries) != -1){
								results.push(item);
								isFiltered = true;
							}
						}
					});

				});
			}

		});
		
		renderSingle(results);
	}
	

	var init = function() {
		data();
		console.log(decodeURI(window.location.hash));
		$('.close').on('click', function (e) {
			e.preventDefault();
			$('.cartoon').removeClass('visible');
			window.location.hash = '#';
		});

		buttons.on('click', function (e) {
			e.preventDefault();
			var cat = $(this).parent();
			var f = cat.attr("class");
			console.log(cat);
			
			// When a checkbox is checked we need to write that in the filters object;
			if(cat.hasClass('active')) {
				// If the filter for this category isn't created yet - do it.
				if(!(countries[f] && countries[f].length)){
					countries[f] = [];
				}
				//	Push values into the chosen filter array
				countries[f].push(f);
				console.log(countries);
				// Change the url hash;
				hashing(countries);
				cat.removeClass('active');
			}

				

			if(!cat.hasClass('active')) {
				if(countries[f] && countries[f].length && countries[f].indexOf(f) != -1){
					var index = countries[f].indexOf(f);

					countries[f].splice(index, 1);
					cat.addClass('active');

					if(!countries[f].length) {
						delete countries[f];
					}
				}
				hashing(countries);
			}
		});

		$(window).on('hashchange', function(){
			render(decodeURI(window.location.hash));
		});
	};

	return {
		init: init
	};
})();

$(document).ready(app.main.init);