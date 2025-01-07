export default function Collapse({ collapse, children, className }) {
    return (
        <div className={`transition-all duration-300 overflow-hidden ${collapse ? '!py-0 max-h-0' : 'max-h-screen'} ${className ? className : ''}`}>
            {children}
        </div>
    );
}