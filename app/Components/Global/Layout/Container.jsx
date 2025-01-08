export default function Container({ children, className }) {
    return (
        <div className={`w-full h-screen max-w-screen-2xl mx-auto ${className ? className : ''}`}>
            {children}
        </div>
    );
}