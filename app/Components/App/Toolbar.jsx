import { useEffect, useState } from "react";
import { usePlotStore } from "~/Context/PlotProvider";
import { Cross, Navigation, Pan } from "~/Icons/BI";

import ToggleButton from "../Global/FormElements/ToggleButton";

const buttons = [
    { Icon: Navigation },
    { Icon: Pan },
    { Icon: Cross },
];

export default function Toolbar() {
    const [btnInd, setBtnInd] = useState(0);
    const { plot } = usePlotStore();
    
    useEffect(() => {
        if (plot === null) return;

        plot.lockZoom();
        plot.removeCross();
        plot.removeBrush();

        switch (btnInd) {
            case 0:
                plot.lockZoom();
                break;
            case 1:
                plot.applyZoom();
                break;
            case 2:
                plot.applyCross();
                break;
            default:
                break;
        }

    }, [btnInd]);

    return (
        <ToggleButton 
            buttons={buttons}
            btnInd={btnInd}
            setButton={setBtnInd}   
        />
    );
}