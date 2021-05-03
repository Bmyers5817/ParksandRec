// Define SVG area dimensions
var svgWidth = 1105;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select(".bar")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("parksdataframe.csv").then(function (csvdata) {
    console.log(csvdata);
    var zipCodesGrouped = d3.nest()
      .key(function (d) {
        return d.zipcode;
      })
      .entries(csvdata);
      var data = zipCodesGrouped.map(zip => {
        return {
          group: zip.key,
          population: (+zip.values[0].population)/1000,
          numberOfParks: zip.values.length
        }
      })
  console.log(data);
    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ['population', "numberOfParks"];
  console.log(subgroups);
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d.group)}).keys()
  console.log(groups);
    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, svgWidth])
      .padding([0.2])
    svg.append("g")
      .attr("transform", "translate(0," + svgHeight + ")")
      .call(d3.axisBottom(x).tickSize(0));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 40])
      .range([ svgHeight, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));


    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])
    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c','#377eb8','#4daf4a'])



    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return svgHeight - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });
  }).catch(function (error) {
    console.log(error);
  });