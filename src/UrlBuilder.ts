import { PROTOCOL_VERSION } from "./Constants"

export function buildNegotiate(baseUrl: string, queryString: string): string {
    return `${baseUrl}/negotiate?clientProtocol=${PROTOCOL_VERSION}&${queryString}`;
}

export function buildConnect(baseUrl:string, transportName: string, connectionToken: string, queryString: string) {
    return `${baseUrl}/connect?clientProtocol=${PROTOCOL_VERSION}&transport=${transportName}&connectionToken=${connectionToken}&${queryString}`;
}

export function buildStart(baseUrl:string, transportName: string, connectionToken: string, queryString: string) {
    return `${baseUrl}/connect?clientProtocol=${PROTOCOL_VERSION}&transport=${transportName}&connectionToken=${connectionToken}&${queryString}`;
}
