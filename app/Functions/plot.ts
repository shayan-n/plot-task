import * as d3 from "d3";

type Bound = {
    width: number,
    height: number,
} | null

type PlotPoint = {
    x: number,
    y: number,
    label?: string
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
    data=[],
}: IPlotArgs ) {
    console.log("Ploted");

    // Select SVG Elements
    const $svg = d3.select(svgNode);
    const $xAxis = $svg.select("#x-axis");
    const $yAxis = $svg.select("#y-axis");
    const $grid = $svg.select("#grid");
    const $view = $svg.select("#view");
    const $walls = $svg.select("#walls");
    const $cross = $svg.select("#cross");

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
    const draw = () => {
        // Draw Datas on view
        $view.call(drawDatas, data, x, y);
    };

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
        );

        // Walls
        $walls
          .selectAll("rect")
          .data([
            [0, 0, margin.left, bound.height],
            [0, 0, bound.width, margin.top],
            [0, bound.height - margin.bottom, bound.width, bound.height],
            [bound.width - margin.right, 0, bound.width, bound.height],
          ])
          .join("rect")
            .attr('x', d => d[0])
            .attr('y', d => d[1])
            .attr('width', d => d[2])
            .attr('height', d => d[3])
            .attr('fill', "white")

        draw();
    }

    // Events
    const zoom = d3.zoom();
    const brush = d3.brush();

    const handleZoom = (e: d3.D3ZoomEvent<any, any> | { transform: d3.ZoomTransform }) => {
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
        if (!extent) return;

        brush.clear($svg.select("#brush"))
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
    
    const applyBrush = () => {
        $svg
        .append("g")
        .attr("id", "brush")
        .call(brush);
        
        brush.on("end", zoomOnSelection);
    }

    const removeBrush = () => {
        brush.on("end", null);
        $svg.select("#brush").remove();
    }

    const handleCross = (e: any) => {
        if (bound === null) return;
        const [mouseX, mouseY] = d3.pointer(e);
        
        $cross
          .selectAll("line")
          .data(["vertical-cross", "horizontal-cross"])
          .join("line")
            .attr("id", d => d)

        if (
            mouseX >= margin.left &&
            mouseX <= bound.width - margin.right
        ) {
            $cross
              .select("#vertical-cross")
                .attr("x1", mouseX)
                .attr("x2", mouseX)
                .attr("y1", margin.top)
                .attr("y2", bound.height - margin.bottom)
              .call(drawCrossLine)
        }

        if (
            mouseY >= margin.top &&
            mouseY <= bound.height - margin.bottom
        ) {
            $cross
              .select("#horizontal-cross")
                .attr("y1", mouseY)
                .attr("y2", mouseY)
                .attr("x1", margin.left)
                .attr("x2", bound.width - margin.right)
              .call(drawCrossLine)
        }
    }

    const applyCross = () => {
        $svg.on("mousemove.cross", handleCross);
    }

    const removeCross = () => {
        $svg.on("mousemove.cross", null);
        $cross
          .selectAll("line")
          .data([])
          .join("line")
    }
        
    // Apply
    $svg.call(zoom as any);
    initDraw();

    return {
        applyCross, removeCross,
        applyBrush, removeBrush,
        resetZoom, lockZoom, applyZoom,
        draw,
    }
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
        .attr("cy", (d: any) => y(d.y))
        .attr("fill", "orange");
}

function drawCrossLine(selection: any) {
    return selection
        .attr("stroke", "red");
}