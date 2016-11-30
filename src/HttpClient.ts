import { IHttpClient } from "./IHttpClient"

export class HttpClient implements IHttpClient {
    public get(url:string): Promise<string> {
        return this.xhr("GET", url);
    }

    public post(url:string, data: string): Promise<string>{
        return this.xhr("POST", url);
    }

    private xhr(method: string, url: string, data?: string): Promise<string> {
        let promise = new Promise<string>((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.send(data);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({status: xhr.status, statusText: xhr.statusText});
                }
            };

            xhr.onerror = () => {
                reject({status: xhr.status, statusText: xhr.statusText});
            };
        });

        return promise;
    }
}