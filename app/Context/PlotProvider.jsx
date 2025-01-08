import { createContext, useContext, useRef, useState } from "react";

const PlotContext = createContext(null);

export function usePlotStore() {
    return useContext(PlotContext);
}

export function PlotProvider({ children }) {
    const [domain, setDomain] = useState([-10, 10]);
    const [range, setRange] = useState([-10, 10]);
    const [margin, setMargin] = useState({
        top: 30, right: 60, bottom: 30, left: 30
    });
    const [title, setTitle] = useState("H Graph (hover points)");
    const [xLabel, setXLabel] = useState("X");
    const [yLabel, setYLabel] = useState("Y");
    
    const dataPoints = useRef([
        { x: -1.5, y: 0, label: "Left Center Node" },
        { x: -1.5, y: 5, label: "Top Left Node" },
        { x: -1.5, y: -5, label: "Bottom Left Node" },
        { x: -1.5, y: 0, label: "Left Center Node" },
        { x: 1.5, y: 0, label: "Right Center Node" },
        { x: 1.5, y: 5, label: "Top Right Node" },
        { x: 1.5, y: -5, label: "Bottom Right Node" },
    ]);
    const [plot, setPlot] = useState(null); 

    const context = {
        domain, setDomain,
        range, setRange,
        margin, setMargin,
        title, setTitle,
        xLabel, setXLabel,
        yLabel, setYLabel,
        dataPoints: dataPoints.current,
        plot, setPlot
    };

    return (
        <PlotContext.Provider value={context}>
            {children}
        </PlotContext.Provider>
    )
}