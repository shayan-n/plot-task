import { useRef } from "react";

export default function Input({ label, name, placeholder, value, setValue=null }) {
    const ref = useRef(null);
    const controlledElementProps = typeof setValue === "function" ? {
        value: value,
        onChange: (e) => setValue(e.target.value)
    } : {};

    return (
        <div 
            role="textbox"
            tabIndex={-1}
            onKeyDown={() => {}}
            className="ui-input cursor-text w-full"
            onClick={() => ref.current.focus()}    
        >
            {
                label ? (
                    <label className="cursor-text">{label}</label>
                ) : null
            }
            <input 
                ref={ref}
                type="text" 
                name={name}
                placeholder={placeholder}
                {...controlledElementProps}
            />
        </div>
    );
}