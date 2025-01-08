import { createContext, useContext, useRef, useState } from "react";

const PlotContext = createContext(null);

export function usePlotStore() {
    return useContext(PlotContext);
}

export function PlotProvider({ children }) {
    const [domain, setDomain] = useState([0, 10]);
    const [range, setRange] = useState([0, 10]);
    const [margin, setMargin] = useState({
        top: 30, right: 60, bottom: 30, left: 30
    });
    const [title, setTitle] = useState("Test");
    const [xLabel, setXLabel] = useState("X Axis");
    const [yLabel, setYLabel] = useState("Y Axis");
    
    const dataPoints = useRef([
        { x: 1, y: 2 },
        { x: 3, y: 5 },
        { x: 2, y: 3 },
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