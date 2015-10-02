"use strict";

// CONSTANTS
	// 500 and 950 are the "outer margin" of svg, margin vals provide buffer/padding for axes
var margin = { top: 10, right: 10, bottom: 30, left: 40 },
	height = 500 - (margin.top + margin.bottom),
	width = 950 - (margin.left + margin.right),
	duration = 750;


	// scale must be ordinal because the values are not numerical
var x = d3.scale.ordinal()
		// rangeRoundBands creates equal partitions based on width/data.length
		// "round" helps with aliasing issues (i.e. rounds values to 0.1)
		.rangeRoundBands([0, width], 0.1),

	// y scale can be linear because it's numerical
	y = d3.scale.linear()
		.range([height, 0]);

	// initialize x axis; set scale and location
var initX = d3.svg.axis()
			.scale(x)
			.orient("bottom");

	// initialize y axis; set scale and location
var initY = d3.svg.axis()
			.scale(y)
			.orient("left");

	// tooltips library; indicate positioning of tt and create render string
var tip = d3.tip()
			.attr("class", "d3-tip")
			.direction("e")
			.offset([0,10])
			.html(function(each) { return "<div class='tooltip'>"+ each.tip +"</div>"; })

	// capture parent elem
	// add properties (attrs) dictating structure and display
	// add a "g" elem in which chart will be drawn
	// translate to margins so y axis & title will have room to display
var histogram = d3.select("#histogram")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// append elem in which axis will display
var xAxis = histogram.append("g")
					 .attr("class", "x axis")
					 .attr("transform", "translate(0," + height + ")")

	// append elem in which axis will display
var yAxis = histogram.append("g")
					 .attr("class", "y axis")

	// create and render a title for the graph
var title = histogram.append("text")
					 .attr("x", (width/2))
					 .attr("y", margin.top)
					 .attr("text-anchor", "middle")
					 .style("font-size", "16px")
					 .style("text-decoration", "underline")
					 .text("Github Login Letter Counts")

	// initialize tooltips on the histogram/svg
histogram.call(tip);

// Creates and updates graph display based on data
// affects only the dynamic elements
function draw(data) {

	// provide the input values that will then be scaled proprtionately within output range
	x.domain(data.map(function(each) { return each.letter }));
	y.domain([0, d3.max(data.map(function(each) { return each.value + 5 }))])

	// create/update the x axis based on domain w/ updated data
	xAxis.call(initX);

	// create/update the y axis based on domain w/ updated data
	yAxis.transition()
		 .duration(duration)
		 .call(initY);

	// insert/update the data (as array) passed in to draw()
	var bars = histogram.selectAll(".bar")
						.data(data)

	// create new elems based on input data
	// for each piece/index, append a <rect class="bar">data[idx]</rect>
	bars.enter().append("rect")
		.attr("class", "bar")
		.attr("width", x.rangeBand())

	// set the x and y (indicates where on svg to begin drawing) using scaling functions
	// add nice transition functionality to make data changes smooth
	// duration can be changed at the top
	bars.transition()
		.duration(duration)
		.attr("x", function(each) { return x(each.letter); })
		.attr("y", function(each) { return y(each.value); })
		// set height (indicating the actual height of the bar/rect/"drawing")
		// take the graph height and subtract the scaled value because svg's draw from top left
		.attr("height", function(each) { return (height - y(each.value)); })
	
	// give tooltip on hover functionality
	bars.on("mouseover", tip.show)
		.on("mouseout", tip.hide)

	// removes the elems that are not "in use" or maintained from one graph iteration to the next
	// most likely all the elems (27 each time) will be removed
	bars.exit().transition()
		.duration(duration)
		.remove();
}

function update(data) {
	// capture element
	var searchInput = $("#search-text"),
		termDisplay = $("#term"),
		loginDisplay = $("#logins");

	// make ajax request with input value to github API user endpoint
	$.ajax({
		type: "GET",
		url: "https://api.github.com/search/users?q=" + searchInput.val().trim(),
		dataType: "json",
		success: function(data) {
			// display returned user logins to console
			// purely for evaluation purposes
			/* 
			data.items.forEach(function(user) { console.log(user.login); });
			console.log("--------------------\n\n"); 
			*/

			// format the data then pass it into the drawing function
			draw(buildHashMap(data.items));
			
			// show the last/current submitted search term
			termDisplay.text(searchInput.val())

			// display number of returned users
			loginDisplay.text(data.items.length)

			// clear the input text
			searchInput.val("");
		},
		error: function(err) { alert(err) }
	})
}

function buildHashMap(data) {
	// use a hash table to count the instances of each letter or "other"
	// Array (vs Object) because d3 appears to require Array (extensive internal use of .map())
	var hashMap = [], 
		other = { letter: "Other", value: 0 };

	// initialize a hashmap with all letters of alphabet to display 0 for letters that don't exist in data
	// this approach seemed better than looping through after creating the hashmap and attempting to create
	// objects in the undefined slots. Also made it easier to put other at the end (right edge of the graph)
	for(var i = "A".charCodeAt(); i <= "Z".charCodeAt(); i++) {
		hashMap.push({letter: String.fromCharCode(i), value: 0});
	}
	// append ^other object to count the "Other" values
	hashMap.push(other);

	// capture each login, split login str to an array
	data.forEach(function(userObj) {
		var login = userObj.login.split("");
		
		// while the login array has length
		while(login.length) {
			// pop value off
			var _char = login.pop();
			
			// if it's a letter
			if(/[A-Za-z]/g.test(_char)){ 
				// hash the (uppercase) letter
				var hash_char = _hash(_char.toUpperCase());
				
				// increment the value prop
				hashMap[hash_char].value++;

				// console.log(_char, hashMap[hash_char]);
			}
			else {
				// increment the value prop of "other"
				hashMap[hashMap.length-1].value++;
			}
		}
	})

	// add a 'tip' property (html string)to each to be used when creating/displaying the tooltips
	return hashMap.map(function(each) {
		each.tip = "<div class='tip ltr'>Letter: '" + each.letter + "'</div>" 
				 + "<div class='tip val'>Value: " + each.value + "</div>"
		return each;
	});
}

function _hash(val) {
	// in order to align with the preexisting/generated objects in hashMap, add 13
	return ((val.charCodeAt()+13)%26);
}

// event listener for button click
d3.select("#github-search")
	.on("click", update);

