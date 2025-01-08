import React from "react";
import Divider from "../Divider";

const activeBtn = (index, length) => {
    let style = "bg-pink-300 text-pink-800 !outline-2 !outline-pink-800 !outline z-10";

    if (index === 0) {
        style += " rounded-t-xl"
    } if (index + 1 === length) {
        style += " rounded-b-xl"
    }

    return style;
};

export default function ToggleButton({
    buttons,
    btnInd,
    setButton
}) {
    if (!(buttons instanceof Array) || buttons.length < 1) return <></>;
    return (
        <div className="flex flex-col sketch-shadow rounded-xl w-fit h-fit">
            {
                buttons.map((button, ind) => (
                    <React.Fragment key={`toggle-button-${ind}`}>
                        <button 
                            className={`p-3 ${btnInd === ind ? activeBtn(ind, buttons.length) : ""}`}
                            onClick={() => {
                                setButton(ind);
                            }}
                        >
                            <button.Icon size="sm"></button.Icon>
                        </button>
                        { ind !== ((buttons?.length ?? 0) - 1) ? <Divider /> : null }
                    </React.Fragment>
                ))
            }
        </div>
    );
}