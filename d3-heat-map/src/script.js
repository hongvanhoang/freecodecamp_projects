const plotWidth = 6 * 262; // each horizontal bar correspond to one year, 6px wide
const plotHeight = 30 * 12; // each vertical bar = one month, length = 30px
const padding = 150;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", plotWidth + 2 * padding)
  .attr("height", plotHeight + 2 * padding)
  .attr("id", "main-plot");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//create an array of consecutive number from 1753 to 2015
const arrayRange = (start, stop, step) =>
  Array.from(
    {
      length: (stop - start) / step + 1,
    },
    (value, index) => start + index * step
  );

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
).then(function (data) {
  // declare variables
  const baseTemperature = data.baseTemperature;
  const monthlyVariance = data.monthlyVariance;
  const length = monthlyVariance.length;
  const [minMonlyVariance, maxMonthlyVariance] = d3.extent(
    monthlyVariance,
    (d) => d.variance
  );
  const startYear = monthlyVariance[0].year; // 1753
  const endYear = monthlyVariance[length - 1].year; // 2015
  const yearRange = arrayRange(startYear, endYear, 1);

  //set temperature range. temperatures are represented in 12 colors
  const tempRange = maxMonthlyVariance - minMonlyVariance;
  const tempStep = tempRange / 12;
  const temp1 = minMonlyVariance + tempStep;
  const temp2 = minMonlyVariance + 2 * tempStep;
  const temp3 = minMonlyVariance + 3 * tempStep;
  const temp4 = minMonlyVariance + 4 * tempStep;
  const temp5 = minMonlyVariance + 5 * tempStep;
  const temp6 = minMonlyVariance + 6 * tempStep;
  const temp7 = minMonlyVariance + 7 * tempStep;
  const temp8 = minMonlyVariance + 8 * tempStep;
  const temp9 = minMonlyVariance + 9 * tempStep;
  const temp10 = minMonlyVariance + 10 * tempStep;
  const temp11 = minMonlyVariance + 11 * tempStep;

  // colors array
  const colors = [
    "navy",
    "blue",
    "cyan",
    "#87CEEB",
    "#ffff8f",
    "yellow",
    "orange",
    "#f89880",
    "#ff4433",
    "red",
    "#a42304",
    "#630330",
  ];

  // scales
  const xScale = d3
    .scaleBand()
    .domain(yearRange)
    .range([padding, padding + plotWidth]);

  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([padding, padding + plotHeight]);

  //tooltip
  const tooltip = d3
    .select("body")
    .append("text")
    .attr("id", "tooltip")
    .style("opacity", 0);

  //heat map
  svg
    .selectAll("rect")
    .data(monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("data-month", (d) => d.month - 1) // to pass FCC's test number 8
    .attr("data-year", (d) => d.year)
    .attr("data-temp", (d) => baseTemperature + d.variance)
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(months[d.month - 1]))
    .attr("width", 6)
    .attr("height", 30)
    .style("fill", (d) => {
      if (d.variance < minMonlyVariance + tempStep) {
        return colors[0];
      } else if (d.variance >= temp1 && d.variance < temp2) {
        return colors[1];
      } else if (d.variance >= temp2 && d.variance < temp3) {
        return colors[2];
      } else if (d.variance >= temp3 && d.variance < temp4) {
        return colors[3];
      } else if (d.variance >= temp4 && d.variance < temp5) {
        return colors[4];
      } else if (d.variance >= temp5 && d.variance < temp6) {
        return colors[5];
      } else if (d.variance >= temp6 && d.variance < temp7) {
        return colors[6];
      } else if (d.variance >= temp7 && d.variance < temp8) {
        return colors[7];
      } else if (d.variance >= temp8 && d.variance < temp9) {
        return colors[8];
      } else if (d.variance >= temp9 && d.variance < temp10) {
        return colors[9];
      } else if (d.variance >= temp10 && d.variance < temp11) {
        return colors[10];
      } else {
        return colors[11];
      }
    })
    .on("mouseover", (d) => tooltip.style("opacity", 1))
    .on("mousemove", function (event, d) {
      tooltip
        .html(
          months[d.month - 1] +
            " " +
            d.year +
            ": " +
            (d.variance + baseTemperature).toFixed(3) +
            "&deg;C"
        )
        .attr("data-year", d.year)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    })
    .on("mouseout", (d) =>
      tooltip.transition().duration(1000).style("opacity", 0)
    );

  //axes
  const xAxis = d3.axisBottom(xScale).tickValues(arrayRange(1755, 2015, 5));
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", "translate(0," + (plotHeight + padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis);
  svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .attr("id", "y-axis")
    .call(yAxis);

  //legend
  const legend = svg.append("g").attr("id", "legend");
  const legendSize = 80;
  const tempLegend = [
    minMonlyVariance + baseTemperature,
    temp1 + baseTemperature,
    temp2 + baseTemperature,
    temp3 + baseTemperature,
    temp4 + baseTemperature,
    temp5 + baseTemperature,
    temp6 + baseTemperature,
    temp7 + baseTemperature,
    temp8 + baseTemperature,
    temp9 + baseTemperature,
    temp10 + baseTemperature,
    temp11 + baseTemperature,
  ]; // temperature scale

  for (let i = 0; i < 12; i++) {
    legend
      .append("rect")
      .attr("x", padding + i * legendSize)
      .attr("y", plotHeight + 1.4 * padding)
      .attr("height", legendSize / 2)
      .attr("width", legendSize)
      .style("fill", colors[i]);
  }
  for (let i = 0; i < 12; i++) {
    legend
      .append("text")
      .attr("x", padding + i * legendSize - 25)
      .attr("y", plotHeight + 1.8 * padding)
      .text(tempLegend[i].toFixed(3));
  }
  legend
    .append("text")
    .attr("x", padding + 12 * legendSize - 30)
    .attr("y", plotHeight + 1.8 * padding)
    .html(maxMonthlyVariance + baseTemperature + "&deg;C");
});
