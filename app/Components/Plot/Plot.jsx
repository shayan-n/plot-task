import { plot } from "~/Functions/plot.ts";
import { useEffect, useRef, useState } from "react";
import { usePlotStore } from "~/Context/PlotProvider";

export default function Plot() {
    const svgRef = useRef(null);
    const [bound, setBound] = useState(null);
    const { 
        domain, setDomain, 
        range, setRange,
        margin
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
    plot({
        svgNode: svgRef.current,
        bound, domain, range, margin,
        setDomain, setRange,
        data: [
            { x: 0, y: 0 },
            { x: 3, y: 2 },
            { x: 1, y: 5 },
            { x: 7, y: 2 },
            { x: 5, y: 4 },
            { x: 9, y: 1 },
            { x: 1, y: 8 },
            { x: 3, y: 6 },
        ],
    });

    return (
        <svg width="100%" height="100%" ref={svgRef} >
            <text id="title"></text>
            <text id="x-label"></text>
            <text id="y-label"></text>
            <g id="x-axis"></g>
            <g id="y-axis"></g>
            <g id="grid">
                <g id="grid-vertical-lines"></g>
                <g id="grid-horizontal-lines"></g>
            </g>
            <g id="view"></g>
            <g id="cross">
                <line id="horizontal-cross"></line>
                <line id="vertical-cross"></line>
            </g>
            <g id="brush"></g>
        </svg>
    );
}