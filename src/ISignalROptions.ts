import {IHttpClient} from "./IHttpClient"
import {ITransport} from "./ITransport"

export interface ISignalROptions {
    httpClient?: IHttpClient;
    transport?: ITransport;
}