const w = window.screen.width;
const h = window.screen.height;
const padding = 150;

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");

//convert to ISO string to pass test #8 in FCC
function convertTime(string) {
  // string in %M:%S format
  return parseTime("1970-01-01T00:" + string);
}
function stringToISOString(string) {
  // string in %M:%S format
  let convert = convertTime(string);
  return convert.toISOString();
}

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
).then(function (data) {
  // scales
  const xScale = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.Year) - 1, d3.max(data, (d) => d.Year) + 1])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => convertTime(d.Time)))
    .range([padding, h - padding]);

  //tooltip
  var tooltip = d3
    .select("body")
    .append("text")
    .attr("id", "tooltip")
    .style("opacity", 0);

  //dots
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => stringToISOString(d.Time))
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(convertTime(d.Time)))
    .attr("r", (d) => 10)
    .style("stroke-width", 2)
    .style("stroke", (d) => {
      if (d.Doping === "") {
        return "blue";
      } else {
        return "red";
      }
    })
    .style("fill", (d) => {
      if (d.Doping === "") {
        return "blue";
      } else {
        return "none";
      }
    })
    .on("mouseover", (d) => tooltip.style("opacity", 1))
    .on("mousemove", function (event, d) {
      tooltip
        .html(
          d.Name +
            " (" +
            d.Nationality +
            ")<br />" +
            d.Time +
            " (" +
            d.Year +
            ")<br />" +
            d.Doping
        )
        .attr("data-year", d.Year)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    })
    .on("mouseout", (d) =>
      tooltip.transition().duration(1000).style("opacity", 0)
    );

  //axes
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(""));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

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

  //legend
  svg
    .append("circle")
    .attr("id", "legend")
    .attr("class", "legend")
    .attr("cx", w - 3 * padding)
    .attr("cy", padding + 20)
    .attr("r", 10)
    .style("stroke-width", 2)
    .style("stroke", "red")
    .style("fill", "none");
  svg
    .append("text")
    .attr("class", "legend")
    .attr("x", w - 3 * padding + 25)
    .attr("y", padding + 20)
    .text("With doping allegations");
  svg
    .append("circle")
    .attr("class", "legend")
    .attr("cx", w - 3 * padding)
    .attr("cy", padding + 50)
    .attr("r", 10)
    .style("stroke-width", 2)
    .style("stroke", "blue")
    .style("fill", "blue");
  svg
    .append("text")
    .attr("class", "legend")
    .attr("x", w - 3 * padding + 25)
    .attr("y", padding + 50)
    .text("No doping allegations");
});
