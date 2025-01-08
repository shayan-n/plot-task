import { usePlotStore } from "~/Context/PlotProvider";

import Plot from "~/Components/Plot/Plot";
import Toolbar from "~/Components/App/Toolbar";
import Properties from "~/Components/App/Properties";
import Container from "~/Components/Global/Layout/Container";
import Button from "~/Components/Global/Button";

export default function _index() {   
    const {plot} = usePlotStore();
    
    return (
        <Container className="flex p-8 pb-0 overflow-hidden gap-4">
            <div className="w-full h-full flex flex-col gap-4 pb-4">
                <Plot />
                <div className="flex items-center justify-center">
                    <Button 
                        className="w-fit px-8"
                        onClick={() => plot?.resetZoom?.()}
                    >
                        Reset Zoom
                    </Button>
                </div>
            </div>
            <div className="flex gap-4 w-96 h-full shrink-0">
                <Toolbar />
                <Properties />
            </div>
        </Container>
    );
}