import { plot } from "~/Functions/plot.ts";
import { useEffect, useRef, useState } from "react";
import { usePlotStore } from "~/Context/PlotProvider";

export default function Plot() {
    const svgRef = useRef(null);
    const [bound, setBound] = useState(null);
    const {
        domain, range,
        margin, title,
        xLabel, yLabel,
        dataPoints, setPlot
    } = usePlotStore();

    // only re-render on window change
    useEffect(() => {
        function setBoundary() {
            setBound(svgRef.current.getBoundingClientRect());
        }

        setBoundary();
        window.addEventListener("resize", setBoundary);

        () => window.removeEventListener("resize", setBoundary);
    }, []);

    // d3
    useEffect(() => {
        const res = plot({
            svgNode: svgRef.current,
            bound, domain, range, margin,
            data: dataPoints,
        });
        setPlot(res);
    }, [domain, range, margin, bound]);

    return (
        <svg width="100%" height="100%" ref={svgRef}>
            <defs>
                <filter x="0" y="0" width="1" height="1" id="solid">
                    <feFlood floodColor="#fed7aa" result="bg" />
                    <feMerge>
                        <feMergeNode in="bg" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <rect id="svg-bg" x="0" y="0" width="100%" height="100%" fill="white"></rect>
            <g id="grid">
                <g id="grid-vertical-lines"></g>
                <g id="grid-horizontal-lines"></g>
            </g>
            <g id="cross"></g>
            <g id="view"></g>
            <g id="walls"></g>
            <text id="title" fontSize="20" x="50%" y={margin.top - 10} fill="#252423" textAnchor="middle">{title}</text>
            <text id="x-label" fontSize="12" x={(bound?.width ?? 0) - margin.right + 10} y={(bound?.height ?? 0) - margin.bottom} fill="#252423" textAnchor="start">{xLabel}</text>
            <text id="y-label" fontSize="12" x={margin.left} y={margin.top - 10} fill="#252423" textAnchor="start">{yLabel}</text>
            <g id="x-axis"></g>
            <g id="y-axis"></g>
            <text id="detail-view" filter="url(#solid)" fontSize="12" x={(bound?.width ?? 0) - margin.right} y={margin.top - 10} fill="#c2410c" textAnchor="end"></text>
        </svg>
    );
}