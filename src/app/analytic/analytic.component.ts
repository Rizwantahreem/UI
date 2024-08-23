import { AfterViewInit, Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import * as d3 from "d3";
import { DataService } from "../data.service/data.service";
import { style } from "@angular/animations";
import { observable, Observable } from "rxjs";

@Component({
  selector: "app-analytic",
  templateUrl: "./analytic.component.html",
  styleUrls: ["./analytic.component.css"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  data = [];

  eData = [];

  svg!: any;

  totalStar = 100;

  // numCols: Observable<number>;
  numCols = 3;
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         {
  //           title: "ECP Allocation for existing homes",
  //           cols: 1,
  //           rows: 1,
  //           id: "card-1",
  //         },
  //         {
  //           title: "ECP Allocation for new homes",
  //           cols: 2,
  //           rows: 1,
  //           id: "card-2",
  //         },
  //         {
  //           title: "Envoirmental Data",
  //           cols: 3,
  //           rows: 1,
  //           id: "card-3",
  //         },
  //       ];
  //     }

  //     return [
  //       {
  //         title: "ECP Allocation for existing homes",
  //         cols: 1,
  //         rows: 1,
  //         id: "card-1",
  //       },
  //       {
  //         title: "ECP Allocation for new homes",
  //         cols: 2,
  //         rows: 1,
  //         id: "card-2",
  //       },
  //       {
  //         title: "Envoirmental Data",
  //         cols: 3,
  //         rows: 1,
  //         id: "card-3",
  //       },
  //     ];
  //   })
  // );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: DataService
  ) {
    this.data = service.getPieData();
    this.eData = service.getBarData();

    // this.numCols = this.breakpointObserver.observe([Breakpoints.Large]).pipe(
    //   map(({ matches }) => {
    //     if (matches) {
    //       return 3;
    //     }
    //     return 3;
    //   })
    // );
  }

  createDonutChart(data, id, total) {
    const width = 190;
    const height = 190;
    const radius = Math.min(width, height) / 2;

    const tooltip = d3
      .select(id)
      .append("div")
      .attr("id", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "2px");

    const svg = d3
      .select(id)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "flex")
      .style("justify-content", "center")
      .style("padding", "2.8pc")
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#ff5f89", "#ec1d24", "#2e00bc", "#a986ff", "#376933"]);

    var gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", radius)
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#ff5f89" },
        { offset: "100%", color: "#ff5f89" },
      ])
      .enter()
      .append("stop")
      .attr("offset", function (d) {
        return d.offset;
      })
      .attr("stop-color", function (d) {
        return d.color;
      });

    const pie = d3.pie().value((d) => d.value);

    const dataReady = pie(data);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.9);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text(total)
      .style("font-size", "28px")
      .style("font-weight", "bold")
      .style("fill", "#3b2854")
      .attr("class", "inner-text")
      .attr("transform", `translate(0, ${-10})`);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text("Total")
      .style("font-size", "24px")
      .style("fill", "#c9c9c9")
      .attr("class", "inner-text")
      .attr("transform", `translate(0, ${18})`);

    svg
      .selectAll("mySlices")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "none")
      .style("opacity", 0.8)
      .on("mousemove", (event, d) => {
        const [x, y] = d3.pointer(event);
        tooltip
          .style("display", "block")
          .style("background-color", "AliceBlue")
          .style("border", "1.5px solid steelblue")
          // .style("left", x + 7 + "px")
          // .style("bottom", y + 7 + "px")
          .html(`${d.data.label} - ${d.data.value}%`);
        legend.select(d.event).style("color", "green");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    const legendSvg = d3
      .select(id)
      .append("svg")
      .attr("width", width)
      .attr("height", 98)
      .attr("class", "legend")
      .style("margin-top", "6px")
      .style("margin-left", "2pc")
      .style("margin-bottom", "1pc");

    // Create a group for each data point in the legend
    const legend = legendSvg
      .selectAll(".legend")
      .data(dataReady)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(" + i * 0 + "," + i * 20 + ")";
      })
      .attr("alignment-baseline", "middle")
      .style("text-align", "center");

    legend
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 6)
      .style("fill", function (d) {
        return color(d.data.label);
      });

    const legendTextPadding = 3;

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 10)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("margin-right", `${legendTextPadding}px`)
      .text(function (d) {
        return `${d.data.label} - ${d.data.value}%`;
      });
  }

  drawProgressChart(data: any[], total: number, selector: string): void {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 220 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.label))
      .padding(0.2);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);

    const chart = d3
      .select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("display", "flex")
      .style("justify-content", "center")
      .style("padding", "3pc")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chart
      .selectAll(".background-rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "background-rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", 0)
      .attr("width", xScale.bandwidth())
      .attr("height", height)
      .attr("fill", "AliceBlue")
      .attr("ry", "0.6pc");

    chart
      .selectAll(".unfilled-rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "unfilled-rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", 0)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d.value))
      .attr("fill", "#f3f7ff")
      .attr("ry", "0.6pc");

    const color = d3
      .scaleOrdinal()
      // .domain([0, 100])
      .domain([
        "Green House Gas emision",
        "Renewable production",
        "Ecology Strategies",
      ])
      .range(["#c8a7ff", "#ffa0aa", "#ff93a4"]);

    chart
      .selectAll(".filled-rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "filled-rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.progress))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d.total - d.progress))
      .attr("fill", (i) => color(i))
      .attr("ry", "0.6pc");

    const labels = data.map((d) => d.label);

    const dataReady = data.map((d) => ({
      label: d.label,
      value: d.value,
    }));

    const legendSvg = d3
      .select(selector)
      .append("svg")
      .attr("width", width + 40)
      .attr("height", 98)
      .attr("class", "legend")
      .style("margin-top", "6px")
      .style("margin-left", "2pc");

    const legend = legendSvg
      .selectAll(".legend")
      .data(dataReady)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(" + i * 0 + "," + i * 20 + ")";
      })
      .attr("alignment-baseline", "middle")
      .style("text-align", "center");

    legend
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 6)
      .style("fill", function (d, i) {
        return color(i);
      });

    const legendTextPadding = 3;

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 10)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("margin-right", `${legendTextPadding}px`)
      .text(function (d) {
        return d.label;
      });
  }

  ngOnInit(): void {
    this.createDonutChart(this.data, "#card-1", 700);
    this.createDonutChart(this.data, "#card-2", 278);
    this.drawProgressChart(this.eData, this.totalStar, "#card-3");
  }

  ngAfterViewInit(): void {}
}
