import { useState } from "react";
import { ChevronDown, ChevronUp } from "~/Icons/BI";

import Collapse from "./Collapse";

export default function CollapseBox({ title, children, defaultCollapse=false }) {
    const [collapse, setCollapse] = useState(defaultCollapse);

    return (
        <div className="flex flex-col gap-4 select-none">
            <div 
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                onClick={() => setCollapse(c => !c)}
                className="p-4 bg-gray-200 cursor-pointer w-full flex items-center justify-between focus:outline-none"
            >
                <h2 className="text-lg text-zinc-800">{title}</h2>
                <span className="text-zinc-800">
                    {collapse ? <ChevronDown /> : <ChevronUp />}
                </span>
            </div>
            <Collapse collapse={collapse} className='px-4'>
                {children}
            </Collapse>
        </div>
    );
}