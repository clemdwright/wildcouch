console.log("main ran");

function randomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	console.log(color);
	return color;
}

function changeColors() {
	$("body").css("background-image", "none");

	var backgroundColor = randomColor();
	$("body").css("background-color", backgroundColor);
	
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", backgroundColor);

	//From http://stackoverflow.com/questions/16781486/jquery-how-to-adjust-css-filter-blur
	var inversionPercentage = 100 * Math.random();
	var filterVal = 'invert(' + inversionPercentage + '%)';
	$('#news, img')
			  	  .css('filter',filterVal)
			  	  .css('webkitFilter',filterVal)
			  	  .css('mozFilter',filterVal)
			  	  .css('oFilter',filterVal)
			  	  .css('msFilter',filterVal);			  
}

function rollDice() {
	var intervalID = setInterval(function() {
		changeColors();
	}, 100);
	setTimeout(function() {
		clearInterval(intervalID);
	}, 500);
}

window.onload = function() {
	$("#header").click(function() {
		console.log("clicked header");

		rollDice();
		var category = "header";
		var action = $(this).attr("id");
		console.log(category, action);
		ga("send", "event", category, action, {
		    "hitCallback": function() {
				console.log("analytics event sent");
			}
		});
	});
	
	$("a").click(function(event) {
		console.log("clicked anchor");
		event.preventDefault();
		var $elem = $(this);
		var $child = $elem.children();
		var url = $elem.attr("href");
		var category = $elem.parents(".category").attr("id");
		var action = $child.attr("id");
		if (action == null) {
			action = $elem.attr("id");
		}
		console.log(url, category, action);
		ga("send", "event", category, action, {
		    "hitCallback": function() {
				console.log("analytics event sent");
			}
		});
		window.open(url);
	});
}
	
	//   	Phone toggle
	// $("#phone").click(function() {
	// 	console.log("clicked phone");
	// 	$("#phone").hide();
	// 	$("#number").show();
	// })
	// $("#number").click(function() {
	// 	console.log("clicked number");
	// 	$("#number").hide();
	// 	$("#phone").show();
	// })
	//
	//   	Email toggle
	// $("#gmail").click(function() {
	// 	console.log("clicked gmail");
	// 	$("#gmail").hide();
	// 	$("#address").show();
	// })
	// $("#address").click(function() {
	// 	console.log("clicked address");
	// 	$("#address").hide();
	// 	$("#gmail").show();
	// })
