import { useState } from "react";
import { Plus } from "~/Icons/BI";
import { usePlotStore } from "~/Context/PlotProvider";

import Button from "../Global/Button";
import Input from "../Global/FormElements/Input";
import CollapseBox from "./CollapseBox";

export default function Properties() {
    const {
        domain, setDomain,
        range, setRange,
        margin, setMargin,
        title, setTitle,
        xLabel, setXLabel,
        yLabel, setYLabel,
        dataPoints, plot
    } = usePlotStore();
    const [x, setX] = useState(0); 
    const [y, setY] = useState(0); 
    const [label, setLabel] = useState("");

    function handleAdd() {
        if ((x || x === 0) && (y || y === 0) && !dataPoints.some(d => d.x === x && d.y === y)) {
            dataPoints.push({ x, y, label });
            plot?.draw?.();
        } else {
            console.log("try again!");
        }
    }
    
    return (
        <div className="w-full flex flex-col gap-4 h-full">
            <CollapseBox
                title={"Headers"}
                className="flex flex-col gap-3"
                defaultCollapse
            >
                <Input
                    label="Title"
                    placeholder="string"
                    place="out"
                    value={title}
                    setValue={setTitle}
                />
                <Input
                    label="x Label"
                    placeholder="string"
                    place="out"
                    value={xLabel}
                    setValue={setXLabel}
                />
                <Input
                    label="y Label"
                    placeholder="string"
                    place="out"
                    value={yLabel}
                    setValue={setYLabel}
                />
            </CollapseBox>
            <CollapseBox
                title={"Spans"}
                className="flex flex-col gap-3"
            >
                <div className="flex flex-col gap-2">
                    <h3 className="text-zinc-500">Domain</h3>
                    <div className="flex items-center justify-between gap-3">
                        <Input
                            place="in"
                            placeholder="0"
                            value={domain[0]}
                            setValue={(val) => setDomain([val, domain[1]])}
                            type="number"
                        />
                        <Input
                            place="in"
                            placeholder="10"
                            value={domain[1]}
                            setValue={(val) => setDomain([domain[0], val])}
                            type="number"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-zinc-500">Range</h3>
                    <div className="flex items-center justify-between gap-3">
                        <Input
                            place="in"
                            placeholder="0"
                            value={range[0]}
                            setValue={(val) => setRange([val, range[1]])}
                            type="number"
                        />
                        <Input
                            place="in"
                            placeholder="10"
                            value={range[1]}
                            setValue={(val) => setRange([range[0], val])}
                            type="number"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-zinc-500">Margin</h3>
                    <div className="flex flex-col items-center justify-between gap-3">
                        <div className="flex items-center justify-center gap-3">
                            <Input
                                label="Top"
                                place="out"
                                placeholder="30"
                                value={margin.top}
                                setValue={(val) => setMargin({ ...margin, top: val })}
                                type="number"
                            />
                            <Input
                                label="Right"
                                place="out"
                                placeholder="30"
                                value={margin.right}
                                setValue={(val) => setMargin({ ...margin, right: val })}
                                type="number"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Input
                                label="Bottom"
                                place="out"
                                placeholder="30"
                                value={margin.bottom}
                                setValue={(val) => setMargin({ ...margin, bottom: val })}
                                type="number"
                            />
                            <Input
                                label="Left"
                                place="out"
                                placeholder="30"
                                value={margin.left}
                                setValue={(val) => setMargin({ ...margin, left: val })}
                                type="number"
                            />
                        </div>
                    </div>
                </div>
            </CollapseBox>
            <CollapseBox
                title={"Data"}
                className="flex flex-col gap-4"
                defaultCollapse
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Label"
                        place="out"
                        placeholder="string"
                        value={label}
                        setValue={setLabel}
                    />
                    <div className="flex gap-4">
                        <Input
                            label="x"
                            place="out"
                            placeholder="0"
                            type="number"
                            value={x}
                            setValue={setX}
                        />
                        <Input
                            label="y"
                            place="out"
                            placeholder="0"
                            type="number"
                            value={y}
                            setValue={setY}
                        />
                    </div>
                </div>
                <Button 
                    className="text-center"
                    onClick={handleAdd}    
                >
                    <div className="flex items-center justify-center gap-2">
                        <Plus size="sm" />
                        <span className="text-lg">Add</span>
                    </div>
                </Button>
            </CollapseBox>
        </div>
    );
}