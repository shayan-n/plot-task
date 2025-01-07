export default function Button({ children, className, ...props }) {
    return (
        <button 
            {...props}
            className={`rounded-xl hover:bg-zinc-100 bg-white text-zinc-800 border-2 border-zinc-300 text-base px-4 py-1 active:scale-95 ${className}`}
        >
            {children}
        </button>
    );
}