import { useState } from "react";
import { ChevronDown } from "~/Icons/BI";

import Collapse from "../Global/Surfaces/Collapse";

export default function CollapseBox({ title, children, className='', defaultCollapse=false }) {
    const [collapse, setCollapse] = useState(defaultCollapse);

    return (
        <div className={`w-full select-none flex flex-col rounded-xl sketch-shadow shrink overflow-hidden bg-white`}>
            <div 
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                onClick={() => { 
                    setCollapse(c => !c)
                }}
                className={`flex items-center justify-between px-5 py-3 !outline-none ${collapse ? '' : 'border-b'}`}
            >
                <h2 className="text-xl text-zinc-700">{title}</h2>
                <span className={`text-zinc-700 transition-all duration-300 ${collapse ? '' : '-rotate-180'}`}>
                    <ChevronDown />
                </span>
            </div>
            <Collapse collapse={collapse} className={`p-5 ${className}`}>{children}</Collapse>
        </div>
    );
}