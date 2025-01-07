export default function Collapse({ collapse, children, className, smooth=true }) {
    return (
        <div className={`overflow-hidden ${collapse ? 'max-h-0 p-0' : 'max-h-screen'} ${smooth ? 'transition-all duration-700' : ''} ${className ? className : ''}`}>
            {children}
        </div>
    );
}