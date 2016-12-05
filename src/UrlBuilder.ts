import { PROTOCOL_VERSION } from "./Constants"

export function getFullUrl(url: string): string {
    if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
        return url;
    }

    if (!window) {
        throw new Error("Cannot get the full url. Provide full url as the parameter when not running in a browser.")
    }

    return `${window.document.location.protocol}//${window.document.location.host}${url.charAt(0) ==='/' ? "" : "/"}${url}`;
}

export function getQueryString(queryString: string): string {
    if (!queryString) {
        return "";
    }

    if (queryString[0] == '?' || queryString[0] == '&') {
        queryString = queryString.slice(1);
    }
    return "&" + queryString;
}

export function buildNegotiate(baseUrl: string, queryString: string): string {
    return `${baseUrl}/negotiate?clientProtocol=${PROTOCOL_VERSION}${queryString}`;
}

export function buildConnect(baseUrl:string, transportName: string, connectionToken: string, queryString: string) {
    return `${baseUrl}/connect?clientProtocol=${PROTOCOL_VERSION}&transport=${transportName}&connectionToken=${encodeURIComponent(connectionToken)}${queryString}`;
}

export function buildStart(baseUrl:string, transportName: string, connectionToken: string, queryString: string) {
    return `${baseUrl}/start?clientProtocol=${PROTOCOL_VERSION}&transport=${transportName}&connectionToken=${encodeURIComponent(connectionToken)}${queryString}`;
}

export function buildAbort(baseUrl:string, transportName: string, connectionToken: string, queryString: string) {
    return `${baseUrl}/abort?clientProtocol=${PROTOCOL_VERSION}&transport=${transportName}&connectionToken=${encodeURIComponent(connectionToken)}${queryString}`;
}
