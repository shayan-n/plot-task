import { useRef } from "react";

export default function Input({ 
    label, placeholder,
    name, place="in", type="text",
    value, setValue=null 
}) {
    const ref = useRef(null);
    const controlledElementProps = typeof setValue === "function" ? {
        value: value,
        onChange: (e) => setValue(e.target.value)
    } : {};

    return (
        <div className="ui-input-container">
            {
                label && place === "out" ? (
                    <label className="cursor-text">{label}</label>
                ) : null
            }
            <div 
                role="textbox"
                tabIndex={-1}
                onKeyDown={() => {}}
                className="ui-input cursor-text w-full"
                onClick={() => ref.current.focus()}    
            >
                {
                    label && place === "in" ? (
                        <label className="cursor-text">{label}</label>
                    ) : null
                }
                <input 
                    ref={ref}
                    type={type} 
                    name={name}
                    placeholder={placeholder}
                    {...controlledElementProps}
                />
            </div>
        </div>
    );
}