export interface IHttpClient {
    get(url: string) : Promise<string>;
    post(url: string, data: string) : Promise<string>;
}