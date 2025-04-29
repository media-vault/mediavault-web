export function isStandaloneClient(): boolean {
    return window.location.port === "3000";
}

