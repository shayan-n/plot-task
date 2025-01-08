export default function Collapse({ collapse, children, className }) {
    return (
        <div className={`transition-all shrink duration-300 overflow-auto ${collapse ? '!py-0 max-h-0' : 'max-h-screen'} ${className ? className : ''}`}>
            {children}
        </div>
    );
}