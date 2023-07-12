const w = window.screen.width;
const h = window.screen.height;
const padding = 150;

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

/* function convertDate(dateString) {
  // for tooltip I convert event.PageX to corresponding date in the %Y-%m-%d format
  // the date is shifted a few months forwards compared to the original date, so I pushed back the date i.e. 1947-03-01 -> 1947-01-01
  let month = dateString.slice(5, 7);
  let newMonth = "";
  if (parseInt(month) >= 1 && parseInt(month) < 4) {
    newMonth = "01";
  } else if (parseInt(month) >= 4 && parseInt(month) < 7) {
    newMonth = "04";
  } else if (parseInt(month) >= 7 && parseInt(month) < 10) {
    newMonth = "07";
  } else {
    newMonth = "10";
  }
  return dateString.slice(0, 5) + newMonth + "-01";
}
 */
let gdpUS = [];
d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(function (rawData) {
  const parseTime = d3.timeParse("%Y-%m-%d");
  const formatTime = d3.timeFormat("%Y-%m-%d");
  var gdp = rawData.data;
  let dataLength = gdp.length;

  // scales
  const xScale = d3
    .scaleTime()
    .domain([parseTime(gdp[0][0]), parseTime(gdp[dataLength - 1][0])])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(gdp, (d) => d[1])])
    .range([h - padding, padding]);

  const barWidth = Math.ceil((w - 2 * padding) / (dataLength - 1));

  // create a tooltip
  var tooltip = d3
    .select("body")
    .append("text")
    .style("opacity", 0)
    .attr("id", "tooltip");

  svg
    .selectAll("rect")
    .data(gdp)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d) => xScale(parseTime(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", (d) => 4)
    .attr("height", (d) => h - padding - yScale(d[1]))
    .attr("fill", "purple")
    .on("mouseover", function (event, d) {
      tooltip
        .html(d[0] + ": " + d[1] + " USD")
        .attr("data-date", d[0])
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
      tooltip.transition().duration(100).style("opacity", 1);
    })
    .on("mouseout", () =>
      tooltip.transition().duration(1000).style("opacity", 0)
    );

  //axes
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .attr("id", "y-axis")
    .call(yAxis);

  svg
    .append("text")
    .attr("id", "label")
    .attr("x", padding - 40)
    .attr("y", padding - 10)
    .text("GDP (USD)")
    .attr("font-weight", "bold");
});
