import { createContext, useContext, useState } from "react";

const PlotContext = createContext(null);

export function usePlotStore() {
    return useContext(PlotContext);
}

export function PlotProvider({ children }) {
    const [domain, setDomain] = useState([0, 10]);
    const [range, setRange] = useState([0, 10]);
    const [margin, setMargin] = useState({
        top: 30, right: 30, bottom: 30, left: 30
    });

    const context = {
        domain, setDomain,
        range, setRange,
        margin, setMargin,
    };

    return (
        <PlotContext.Provider value={context}>
            {children}
        </PlotContext.Provider>
    )
}