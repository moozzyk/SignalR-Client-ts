interface IHttpClient {
    get(url: string) : Promise<string>;
    post(url: string) : Promise<string>;
}