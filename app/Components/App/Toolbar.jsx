import { useState } from "react";
import { Cross, Lock, Navigation, Pan, Plus, Zoom } from "~/Icons/BI";

import ToggleButton from "../Global/FormElements/ToggleButton";

const buttons = [
    { Icon: Plus },
    { Icon: Navigation },
    { Icon: Pan },
    { Icon: Zoom },
    { Icon: Cross },
    { Icon: Lock },
];

export default function Toolbar() {
    const [btnInd, setBtnInd] = useState(1);

    return (
        <ToggleButton 
            buttons={buttons}
            btnInd={btnInd}
            setButton={setBtnInd}   
        />
    );
}