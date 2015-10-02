"use strict";

var height = 400,
	width = 800,
	margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 50
	},
	today = new Date("2015-09-01").toDateString(),
	startOfDay = new Date(today);

var x = d3.time.scale()
			   // .domain(["3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM"], 1.0)
			   .rangeRound([margin.left, width-margin.right])
var y = d3.scale.linear()
			   // .domain()
			   .range([height - margin.top, margin.bottom])

var initX = d3.svg.axis()
			  .scale(x)
			  .orient("bottom")
			  .ticks(d3.time.hour, 3)
			  // .tickFormat("%l %p");

var initY = d3.svg.axis()
			  .scale(y)
			  .orient("left");

// var tip = d3.tip()
// 			.attr("class", "tooltip")
// 			.direction("e")
// 			.offset([0,10])
// 			.html(function(each) { return "<div class='tooltip'>"+ each.tip +"</div>"; })

	// svg elem in which to draw graph
var graph = d3.select("#graph")
			  .attr("width", width + margin.left + margin.right)
			  .attr("height", height + margin.top + margin.bottom);

var line = d3.svg.line()
			 .x(function(j) {
			 	return x(Date.parse(j.x));
			 })
			 .y(function(j) {
			 	return y(j["NYC Office"]);
			 })
			 // .interpolate("basis");

var xAxis = graph.append("g")
	 			 .attr("class", "x-axis")
	 			 .attr("transform", "translate(0," + (height - margin.bottom) + ")");

var yAxis = graph.append("g")
				 .attr("class", "y-axis")
				 .attr("transform", "translate(" + (margin.left) + ",0)");

var min = d3.min(server_data.data.map(function(j) { return Date.parse(j.x) } )),
	max = d3.max(server_data.data.map(function(j) { return Date.parse(j.x) } ));


x.domain([new Date(min), new Date(max)]);
y.domain([0, d3.max(server_data.data.map(function(j) { return j["NYC Office"] + 1 } )) ]);

xAxis.call(initX);
yAxis.call(initY);

graph.append("path")
	 .attr("d", line(server_data.data))
	 .attr("stroke", "blue")
	 .attr("stroke-width", 2)
	 .attr("fill", "none")



