export default function Container({ children }) {
    return (
        <div className="w-full h-screen max-w-screen-xl mx-auto">
            {children}
        </div>
    );
}