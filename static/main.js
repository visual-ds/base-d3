// Get Scatterplot container
var element = document.getElementById('scatterplot');
var fullHeight = element.clientHeight;
var fullWidth = element.clientWidth;

// Create an SVG element and append it to the left div
var svg = d3.select('#scatterplot')
	.append('svg')
	.attr('width', fullWidth)
	.attr('height', fullHeight);

// Set dimensions for the scatterplot
var margin = {top: 20, right: 20, bottom: 30, left: 40};

var width = fullWidth - margin.left - margin.right;
var height = fullHeight - margin.top - margin.bottom;

function drawScatterplot(data){
	// Remove all previous elements in svg
	svg.selectAll('g').remove()

	// Add new elements
	const g = svg.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// Set up scales
	var minX = d3.min(data, function(d) { return d.x; });
	var maxX = d3.max(data, function(d) { return d.x; });
	var minY = d3.min(data, function(d) { return d.y; });
	var maxY = d3.max(data, function(d) { return d.y; });

	var xScale = d3.scaleLinear()
		.domain([minX - 1, maxX + 1])
		.range([0, width]);

	var yScale = d3.scaleLinear()
		.domain([minY - 1, maxY + 1])
		.range([height, 0]);

	// Add X axis
	g.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(xScale));

	// Add Y axis
	g.append('g')
		.call(d3.axisLeft(yScale));

	// Add points to the scatterplot
	g.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d) { return xScale(d.x); })
		.attr('cy', function(d) { return yScale(d.y); })
		.attr('r', 5)
		.attr('fill', 'blue');
}

function updateInfo(data){
	var element = document.getElementById('bottom-right');
	element.innerHTML = "The number of points is: " + data.length;
}
// Draw initial scatterplot
drawScatterplot(points);
updateInfo(points);

// Use jQuery to detect click on button to update data
$('#update').click(function() {
	// Send an AJAX request to the Flask backend
	$.ajax({
		url: '/change',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ message: 'Update data request' }),
		success: function(response) {
			drawScatterplot(response);
			updateInfo(response);
		},
		error: function(error) {
			console.error('Error:', error);
		}
	});
});