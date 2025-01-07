import * as d3 from "d3";
import type { D3ZoomEvent } from "d3";

type Bound = {
    width: number,
    height: number,
} | null

type PlotPoint = {
    x: number,
    y: number,
    title?: string
}

interface IMargin {
    top: number,
    right: number,
    bottom: number,
    left: number,
}

interface IPlotArgs {
    svgNode: Element,
    bound: Bound, 
    margin: IMargin,
    domain: number[],
    range: number[],
    data?: PlotPoint[]
}

export function plot({
    svgNode, 
    bound, 
    margin,
    domain=[0, 10], 
    range=[0, 10],
    data=[]
}: IPlotArgs ) {
    // Select SVG Elements
    const $svg = d3.select(svgNode);
    const $xAxis = $svg.select("#x-axis");
    const $yAxis = $svg.select("#y-axis");
    const $grid = $svg.select("#grid");
    const $view = $svg.select("#view");

    // Defining scales
    const x = bound === null ? (
        d3.scaleLinear()
    ) : (
        d3.scaleLinear()
          .domain(domain)
          .range([margin.left, bound.width - margin.right])
    );

    const y = bound === null ? (
        d3.scaleLinear()
    ) : (
        d3.scaleLinear()
          .domain(range)
          .range([bound.height - margin.bottom, margin.top])
    );

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    
    // Draw
    if (bound) {
        // Axises
        $xAxis.attr("transform", `translate(0,${bound.height - margin.bottom})`)
          .call(xAxis as any);
        
        $yAxis.attr("transform", `translate(${margin.left},0)`)
          .call(yAxis as any);
        
        // Grid
        const xTickCount = x.domain()[1] - x.domain()[0] + 1; 
        $grid.select('#grid-vertical-lines').call(
            drawGridLines, x.ticks(xTickCount),
            x, bound, margin, "vertical"
        )
        
        const yTickCount = y.domain()[1] - y.domain()[0] + 1; 
        $grid.select("#grid-horizontal-lines").call(
            drawGridLines, y.ticks(yTickCount),
            y, bound, margin, "horizontal"
        )

        // Draw Datas on view
        $view.call(drawDatas, data, x, y);
    }

    // Events
    const handleZoom = (e: D3ZoomEvent<any, any>) => {
        const { transform } = e;
        
        const rescaleX = transform.rescaleX(x);
        const xTickCount = x.domain()[1] - x.domain()[0] + 1;
        const rescaleY = transform.rescaleY(y);
        const yTickCount = y.domain()[1] - y.domain()[0] + 1;

        $view.attr("transform", transform.toString());
        $xAxis.call(xAxis.scale(rescaleX) as any);
        $yAxis.call(yAxis.scale(rescaleY) as any);
        $grid.select("#grid-vertical-lines").call(
            drawGridLines,
            rescaleX.ticks(xTickCount),
            rescaleX, bound, margin, "vertical",
        );
        $grid.select("#grid-horizontal-lines").call(
            drawGridLines,
            rescaleY.ticks(yTickCount),
            rescaleY, bound, margin, "horizontal",
        );
    };

    const zoom = d3
      .zoom()
      .on("zoom", handleZoom);

    $svg.call(zoom as any);
}

function drawGridLines(selection: any, ticks: number[], x: any, bound: Bound, margin: IMargin, dir: "vertical" | "horizontal") {
    if (!bound) return;

    const a1 = [dir === "vertical" ? "x1" : "y1", (d: any) => x(d)];
    const a2 = [dir === "vertical" ? "x2" : "y2", (d: any) => x(d)];
    const a3 = dir === "horizontal" ? ["x1", margin.left] : ["y1", margin.top];
    const a4 = dir === "horizontal" ? ["x2", bound.width - margin.right] : ["y2", bound.height - margin.bottom];

    return selection
      .selectAll("line")
      .data(ticks)
      .join("line")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.1)
        .attr(...a1)
        .attr(...a2)
        .attr(...a3)
        .attr(...a4);
}

function drawDatas(selection: any, data: PlotPoint[], x: any, y: any) {
    return selection
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("r", 3)
        .attr("cx", (d: any) => x(d.x))
        .attr("cy", (d: any) => y(d.y));
}