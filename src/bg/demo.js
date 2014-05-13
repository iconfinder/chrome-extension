

	$(document).ajaxStart(function(){
	    $(".spin").animate({"opacity": 0.8}, 150);
	});

	$(document).ajaxComplete(function(){
		$("#result li").each(function(index) {
		    $(this).delay(22*index).fadeIn(350)
		});
	    $(".spin").animate({"opacity": 0}, 150);
	});

	var showHideStyles = function() {
		var lis = $('li.f').hide();
		var i = 0;
		(function displayStyles() {
			lis.eq(i++).fadeIn(40, displayStyles);
		})();
	};
	$(document).ready(showHideStyles);

	$(document).one("keyup", function() {
	  	$('.style-container').show();
	  	showHideStyles();
	});


/* ==========================================================================
	Controls 
   ========================================================================== */

	$(document).ready(function(){
		// Upadte tags while typing 
		$('.searchField').on('input', function(e) { 
			updateTags(); 
		});
		// Search on ENTER and/or SPACE 
		$('.searchField').keypress(function(e) { 
			if (e.keyCode == 32) {
				if ($(".searchField").val().length != 0 ) {
					search();	
				} else {
					$(".icons-found").html("0");
				};
			}
		});
	});

/* ==========================================================================
	Update Tags  
   ========================================================================== */

	var updateTags = function() {
	    var value = $(".searchField").val().trim().toLowerCase();
	    var words = value.split(" ");    
		var wordsToCheck = ["premium","free","vector","glyph","3d","outline","handdrawn","photorealistic","cartoon","pixel","pixels","smooth","flat" ]
		var word = words[words.length - 1]

		// Add tag if search macthes array
		if($.inArray(word, wordsToCheck) === -1) {
			// Nothing ...
						$("#r0").click();

		} else {
			// console.log(".addTag." + word)
			$(".f input").each(function(){
				$("." + word).click();
			})
		} 

		// Remove All tags if input filed is empty
		if ($(".searchField").val().length == 0 ) {
			$("#r0").click();
		}
	}

/* ==========================================================================
	API Search  
   ========================================================================== */

	var search = function() {
  		var typing = $(".searchField").val();	
		var str = typing 

		// Styles 
		var styleType = ""
		if ( str.indexOf("flat") > -1  || str.indexOf("Flat") > -1 ) {
			styleType = "flat"
		}
		if ( str.indexOf("glyph") > -1  || str.indexOf("Glyph") > -1 ) {
			styleType = "glyph"
		}
		if ( str.indexOf("3d") > -1  || str.indexOf("3D") > -1 ) {
			styleType = "3d"
		}
		if ( str.indexOf("handdrawn") > -1  || str.indexOf("Handdrawn") > -1 ) {
			styleType = "handdrawn"
		}
		if ( str.indexOf("outline") > -1  || str.indexOf("Outline") > -1 ) {
			styleType = "outline"
		}
		if ( str.indexOf("smooth") > -1  || str.indexOf("Smooth") > -1 ) {
			styleType = "smooth"
		}
		if ( str.indexOf("pixel") > -1  || str.indexOf("Pixel") > -1 ) {
			styleType = "glyph"
		}
		if ( str.indexOf("cartoon") > -1  || str.indexOf("Cartoon") > -1 ) {
			styleType = "cartoon"
		}
		if ( str.indexOf("photorealistic") > -1  || str.indexOf("Photorealistic") > -1 ) {
			styleType = "photorealistic"
		}
		// Format 
		var vector = "all"
		var vectorSlug = "any"
		if ( str.indexOf("vector") > -1  || str.indexOf("Vector") > -1 ) {
			vector = "1"
			vectorSlug = "vector"
		}
		// Price
		var premium = "all"
		var premiumSlug = "any"
		if ( str.indexOf("premium") > -1 ) {
			premium = "1"
			premiumSlug = "premium"
		} else if ( str.indexOf("free") > -1 ) {
			premium = "0"
			premiumSlug = "free"
		}

		// Remove any tags from search term & Encode the URL 
		var searchTerm = str.replace(/flat/g, "").replace(/glyph/g, "").replace(/smooth/g, "").replace(/3d/g, "").replace(/handdrawn/g, "").replace(/outline/g, "").replace(/cartoon/g, "").replace(/pixel/g, "").replace(/photorealistic/g, "").replace(/vector/g, "").replace(/free/g, "").replace(/premium/g, "");
		searchTermEncoded = encodeURIComponent(searchTerm);

		$('.searchField').keypress(function(e) { 
			if (e.keyCode == 13) {
				if ($(".searchField").val().length != 0 ) {

	    	        $('.bg').animate({opacity: "0.6"}, 900);

		    		var currentSearch = 'https://www.iconfinder.com/search/?q='+ searchTermEncoded +'&type='+ vectorSlug +'&style='+ styleType +'&price='+ premiumSlug 
	            	window.location = currentSearch
	    	        return false;
				} else {
	    	        return false;
				}
			}		
		});


		$.getJSON('https://api.iconfinder.com/v2/icons/search?query='+ searchTermEncoded +'&count=90&style='+ styleType +'&vector=' + vector + '&premium=' + premium, function(data) {
			var previewUrl = 'https://api.iconfinder.com/v2/icons/search?query='+ searchTerm +'&count=1&style='+ styleType +'&vector=' + vector + '&premium=' + premium
			var linkUrl = 'https://api.iconfinder.com/v2/icons/search?query='+ searchTermEncoded +'&count=1&style='+ styleType +'&vector=' + vector + '&premium=' + premium

			// Show url 
			$(".currentUrl").html(previewUrl);
			// Link to url 
			$(".currentUrl").attr("href", linkUrl)

			// Check if anything found
			var iconsFound = data.total_count
			if (data.total_count == 0) {
				$(".icons-found").html(iconsFound);
				$(".tagit-count").addClass("bigEntrance");
				$("#result img").css("opacity","0.5");
			} else {
				// Invert Specific styles
				var inverted = data.icons[0].styles[0].identifier
				if (inverted == "glyph" || inverted == "outline" ) {
					$("#result").addClass("inverted");
				} else {
					$("#result").removeClass("inverted");
				}
				// Print Icon result 

				var iconOutput="<ul>";

				    for (var i = 0; i < data.icons.length; i++) {
				    	var icon = data.icons[i];

				    	var maxRasterSizeIndex = icon.raster_sizes.length - 1,
				    		rasterSizeIndex = 6;

						if (rasterSizeIndex > maxRasterSizeIndex)
							rasterSizeIndex = maxRasterSizeIndex;

				    	if (!icon.raster_sizes)
				    		continue;

				        iconOutput+= '<li style="display: none;"><a target="_blank" class="hitEnter" href="https://www.iconfinder.com/search/?q='+ searchTermEncoded +'&type='+ vectorSlug +'&style='+ styleType +'&price='+ premiumSlug +'"><img src="' + icon.raster_sizes[rasterSizeIndex].formats[0].preview_url + '" class="slideUp"></a></li>';
				    }

				iconOutput+="</ul>";
				$(".icons-found").html(iconsFound)
				$(".tagit-count").removeClass("slideLeft");
			    document.getElementById("result").innerHTML=iconOutput;
			}
		})
		.error(function(){
			console.log("Too many requests. Wait a couple of minutes. ")
		});	
	};






