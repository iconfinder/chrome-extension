

/* ==========================================================================
   Make inline links clickable
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

/* ==========================================================================
   Focus on Document Clcik
   ========================================================================== */

var searchFocus = function() {
	$("input").focus();
};

$(document).click(function() {
    searchFocus();
}); 



/* ==========================================================================
   Show Hide Styles container
   ========================================================================== 	*/	 


var showHideStyles = function() {
	var lis = $('li.f').hide();
	var i = 0;
	(function displayStyles() {
		lis.eq(i++).fadeIn(40, displayStyles);
	})();
};
$(document).ready(showHideStyles);

$(document).one("keyup", function() {
  	$('.container').show();
  	showHideStyles();
});

/* ==========================================================================
   TypeAhead & Search in Api for matching words
   ========================================================================== */

$(document).keyup(function () {

  	var typing = $('input.asLabel').val();

	if( $('input.asLabel').val() == 0 ) {
  		$('.container').fadeOut();
  		$('#r0').click();
	} else {
    $('.container').fadeIn();
  }

	// Find Styles words in search field and select in styles container
	var str = typing 
	if ( str.indexOf("flat") > -1 || str.indexOf("glyph") > -1 || str.indexOf("3d") > -1 || str.indexOf("handdrawn") > -1 || 
		str.indexOf("cartoon") > -1 || str.indexOf("pixel") > -1 || str.indexOf("smooth") > -1 || str.indexOf("outline") > -1  || 
		str.indexOf("photorealistic") > -1  ) {

		$('.' + str).click();
		console.log('.' + str);
	};

	var searchTerm = str.replace(/flat/g, "").replace(/glyph/g, "").replace(/smooth/g, "").replace(/3d/g, "").replace(/handdrawn/g, "").replace(/outline/g, "").replace(/cartoon/g, "").replace(/pixel/g, "").replace(/photorealistic/g, "").replace(/vector/g, "").replace(/free/g, "");

	$.getJSON('https://www.iconfinder.com/json/search/?q='+ searchTerm +'&c=100&p=0&min=0&max=600&api_key=94d921f8453d416da13bba8deb66112c', function(data) {
		var iconOutput="<ul>";
	    for (var i in data.searchresults.icons) {
	        iconOutput+= '<li><img src="' + data.searchresults.icons[i].image + '"></li>';
	    }
		iconOutput+="</ul>";

		var tagOutput="<ul>";
        // tagOutput+= '<li>' + data.searchresults.icons[0].tags.length + ',</li>';
        // tagOutput+= '<li>' + data.searchresults.icons[0].tags[1] + ',</li>';
        // tagOutput+= '<li>' + data.searchresults.icons[3].tags[0] + '</li>';


		tagOutput+="</ul>";

	    document.getElementById("result").innerHTML=iconOutput;
	    document.getElementById("tags").innerHTML=tagOutput;

	});

});



/* ==========================================================================
   Submit and search 
   ========================================================================== */

$(function() {
    $('form').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if(e.which == 10 || e.which == 13) {

    	        $('.bg').animate({opacity: "0.6"}, 900);

            	var typing = $('input.asLabel').val();
            	var searchTerm = typing.replace(/flat/g, "").replace(/glyph/g, "").replace(/smooth/g, "").replace(/3d/g, "").replace(/handdrawn/g, "").replace(/outline/g, "").replace(/cartoon/g, "").replace(/pixel/g, "").replace(/photorealistic/g, "").replace(/vector/g, "").replace(/free/g, "");

            	if($("input[name='r1']").is(':checked')) { 
            		var selectedStyle = "&style=" + $("input:checked").attr("class");
            	}

            	var format = ""	
      				if ( typing.indexOf("vector") > -1 ) {
      					var format = "&type=vector"	
      				};

            	var price = ""	
      				if ( typing.indexOf("free") > -1 ) {
      					var price = "&price=free"
      				};

            	var currentSearchInput = "http://iconfinder.com/search/?q=" + searchTerm + format + selectedStyle + price

            	window.location = currentSearchInput
    	        return false;

            }
        });
        $(this).find('input[type=submit], .goto').hide();
    });
});










