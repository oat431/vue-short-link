export { };

declare global {
    interface Window {
        config: {
            VITE_API_URL: string;
        };
    }
}