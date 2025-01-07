import * as d3 from "d3";

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
    setDomain: ([...args]: unknown[]) => void,
    setRange: ([...args]: unknown[]) => void,
    data?: PlotPoint[]
}

export function plot({
    svgNode, 
    bound, 
    margin,
    domain=[0, 10], 
    range=[0, 10],
    setDomain,
    setRange,
    data=[],
}: IPlotArgs ) {
    console.log("Ploted");

    // Select SVG Elements
    const $svg = d3.select(svgNode);
    const $xAxis = $svg.select("#x-axis");
    const $yAxis = $svg.select("#y-axis");
    const $grid = $svg.select("#grid");
    const $view = $svg.select("#view");
    const $cross = $svg.select("#cross");
    const $brush = $svg.select("#brush");

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
    const initDraw = () => {
        if (bound === null) return;

        // Axises
        $xAxis.attr("transform", `translate(0,${bound.height - margin.bottom})`)
          .call(xAxis as any);
        
        $yAxis.attr("transform", `translate(${margin.left},0)`)
          .call(yAxis as any);
        
        // Grid
        const xTickCount = domain[1] - domain[0] + 1; 
        $grid.select('#grid-vertical-lines').call(
            drawGridLines, x.ticks(xTickCount),
            x, bound, margin, "vertical"
        )
        
        const yTickCount = range[1] - range[0] + 1; 
        $grid.select("#grid-horizontal-lines").call(
            drawGridLines, y.ticks(yTickCount),
            y, bound, margin, "horizontal"
        )

        // Draw Datas on view
        $view.call(drawDatas, data, x, y);
    }

    // Events
    const zoom = d3.zoom();
    const brush = d3.brush();

    const handleZoom = (e: d3.D3ZoomEvent<any, any>) => {
        const { transform } = e;
        
        const rescaleX = transform.rescaleX(x);
        const xTickCount = domain[1] - domain[0] + 1;
        const rescaleY = transform.rescaleY(y);
        const yTickCount = range[1] - range[0] + 1;

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
    }

    const zoomOnSelection = (e: any) => {
        if (bound === null) return;

        const extent = e.selection;
        const xNewDomain = [x.invert(extent[0][0]), x.invert(extent[1][0])]
        const yNewDomain = [y.invert(extent[1][1]), y.invert(extent[0][1])]
        
        setDomain(xNewDomain);
        setRange(yNewDomain);
    }

    const resetZoom = () => {
        $svg.call(zoom.transform, d3.zoomIdentity);
    }

    const lockZoom = () => {
        zoom.on("zoom", null);
    }

    const applyZoom = () => {
        zoom.on("zoom", handleZoom);
    }
    
    const handleCross = (e: any) => {
        if (bound === null) return;
        const [mouseX, mouseY] = d3.pointer(e);
        
        $cross
          .select("#vertical-cross")
            .attr("x1", mouseX)
            .attr("x2", mouseX)
            .attr("y1", margin.top)
            .attr("y2", bound.height - margin.bottom)
          .call(drawCrossLine)

        $cross
          .select("#horizontal-cross")
            .attr("y1", mouseY)
            .attr("y2", mouseY)
            .attr("x1", margin.left)
            .attr("x2", bound.width - margin.right)
          .call(drawCrossLine)
    }
        
    // Apply
    // $svg.call(zoom as any);
    // $brush.call(brush as any);
    // brush.on("end", zoomOnSelection)
    // applyZoom();
    // $svg.on("mousemove", handleCross);
    initDraw();
}

function drawGridLines(selection: any, ticks: number[], x: any, bound: Bound, margin: IMargin, dir: "vertical" | "horizontal") {
    if (bound === null) return;

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

function drawCrossLine(selection: any) {
    return selection
        .attr("stroke", "red");
}