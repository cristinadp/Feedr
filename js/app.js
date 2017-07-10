/*
  Please add all Javascript code to this file.
  GA JS-SF-7
  Cristina Del Puerto
*/

$(document).ready(function(){

	// implement fetching Guardian articles
	var listGuardianArticles = function() {
		var GUARDIAN_API_KEY = "";
		var guardianSearchURL = "https://content.guardianapis.com/search?api-key=" + GUARDIAN_API_KEY + "&show-fields=thumbnail";

		var makeGuardianClickCallback = function(url) {
			var f = function() {
				$.get(url, function(data, results) {
					// display content
					var content = data.response.content;
					//add title and content to the popUp section 
					$("#popUp h1")[0].innerHTML = content.webTitle;
					$("#popUp p")[0].innerHTML = content.fields.body;
					$(".popUpAction")[0].setAttribute("href", content.webUrl);
				});
			};
			return f;
		}

				
		$.get(guardianSearchURL, function(data, results) {		
			
			var results = data.response.results;

			for (var i=0; i<results.length; i++) {
				var title = results[i].webTitle;
				var image = "https://bakwamagazine.files.wordpress.com/2015/01/the-guardian-logo.png";
				if (results[i].fields) {
					image = results[i].fields.thumbnail;
				}
				var subTitle = results[i].sectionName;
				var articleUrl = results[i].apiUrl + "?api-key=" + GUARDIAN_API_KEY + "&show-fields=body";

				// fetch content for article
				var callbackOne = makeGuardianClickCallback(articleUrl);
				articleSection(image, title, subTitle, callbackOne); //arguments to the params in the function below
			}
		});
	};

	var listNYTArticles = function () {
		var NYT_API_KEY = ""; 
		var nytSearchUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYT_API_KEY;


		var makeNYTClickCallback = function(title, content, url) {
			var popUpFunction = function() {
				$("#popUp h1")[0].innerHTML = title;
				$("#popUp p")[0].innerHTML = content;
				$(".popUpAction")[0].setAttribute("href", url);
			};
			return popUpFunction;
		}

		var NYT_BASE_URL = "https://www.nytimes.com/";
		$.get(nytSearchUrl, function(data, results) {
			var results = data.response.docs;

			for(var i = 0; i < results.length; i++) {
				var image = "https://static01.nyt.com/images/icons/t_logo_291_black.png";
				if (results[i].multimedia.length > 0) {
					image = NYT_BASE_URL + results[i].multimedia[0].url;
				}
				var title = results[i].headline.main;
				var subTitle = results[i].section_name;
				var url = results[i].web_url;
				

				var callbackTwo = makeNYTClickCallback(title, results[i].snippet, url);

				articleSection(image, title, subTitle, callbackTwo);
			}
		});
	};

	var listTechcrunchArticles = function () {
		var TECHCRUNCH_API_KEY = ""; 
		var techcrunchSearchUrl = "https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=" + TECHCRUNCH_API_KEY;

		var makeTechcrunchClickCallback = function(title, content, url) {
			var popUpF = function() {
				$("#popUp h1")[0].innerHTML = title;
				$("#popUp p")[0].innerHTML = content;
				$(".popUpAction")[0].setAttribute("href", url);
			};
			return popUpF;
		}


		$.get(techcrunchSearchUrl, function(data, results) {
			var results = data.articles;

			for(var i = 0; i < results.length; i++) {
				var image = results[i].urlToImage;
				var title = results[i].title;
				var subTitle = "Tech";
				var url = results[i].url;
				

				var callbackThree = makeTechcrunchClickCallback(title, results[i].description, url);

				articleSection(image, title, subTitle, callbackThree);
			}
		});
	};

	var listTheVergeArticles = function () {
		var TheVerge_API_KEY = ""; 
		var TheVergeSearchUrl = " https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=" + TheVerge_API_KEY;

		var makeTheVergeClickCallback = function(title, content, url) {
			var popUpF = function() {
				$("#popUp h1")[0].innerHTML = title;
				$("#popUp p")[0].innerHTML = content;
				$(".popUpAction")[0].setAttribute("href", url);
			};
			return popUpF;
		}


		$.get(TheVergeSearchUrl, function(data, results) {
			var results = data.articles;

			for(var i = 0; i < results.length; i++) {
				var image = results[i].urlToImage;
				var title = results[i].title;
				var subTitle = "Techie";

				var url = results[i].url;
				

				var callbackThree = makeTheVergeClickCallback(title, results[i].description, url);

				articleSection(image, title, subTitle, callbackThree);
			}
		});
	};

	function articleSection($imageParam, $titleParam, $subTitleParam, $clickCallback) {
		//create article elements
		var $wrapper = $('<article class="article"></article>');
		var $sectionImage = $('<section class="featuredImage"></section>');
		var $sectionContent = $('<section class="articleContent"></section>');
		var $sectionImpressions = $('<section class="impressions"></section>');
		var $image = $('<img src="' + $imageParam + '">');
		var $link = $('<a href="#"></a>');
		var $title = $('<h3>');
		var $subTitle = $('<h6>');
		var $clearfix = $('<div class="clearfix"></div>');

		//append elements to the main article
		$title.html($titleParam);
		$sectionImage.append($image);
		$subTitle.append($subTitleParam);	
		$sectionContent.append($title, $subTitle);
		$sectionImpressions.html("526");

		$wrapper.append($sectionImage, $sectionContent, $sectionImpressions, $clearfix);

		//append to the body
		$('#main').append($wrapper);

		// click handler
		$wrapper.on("click", function() {
 		   $("#popUp").toggleClass();
 		   $clickCallback();
 		});

	}

	// deal with closing pop up
	$(".closePopUp").on("click", function() {
	 	// $("#popUp").css("display", "none");
	 	$("#popUp").toggleClass();
		$("#popUp h1")[0].innerHTML = "Loading...";
		$("#popUp p")[0].innerHTML = "";
	});

	// load Guardian by default
	$(".sourceName").html("The Guardian");
	listGuardianArticles();

	// pick source
	$(".dataSource").on("click", function() {
		var source = $(this).attr("id");
		var title = $(this)[0].innerHTML;

		// clear current articles
		$('#main').html("");

		// set source name
		$(".sourceName").html(title);

		// load new source
		switch (source) {
			case "guardian":
				listGuardianArticles();
				break;
			case "nytimes":
				listNYTArticles();
				break;
			case "techcrunch":
				listTechcrunchArticles();
				break;
			case "theverge":
				listTheVergeArticles();
				break;
		}
	});

});
