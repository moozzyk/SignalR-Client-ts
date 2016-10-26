namespace SignalR {
    export class HttpClient implements IHttpClient {
        public get(url:string): Promise<string> {
            return this.xhr("GET", url);
        }

        public post(url:string, data: string): Promise<string>{
            return this.xhr("POST", url);
        }

        private xhr(method: string, url: string, data?: string): Promise<void> {
            let promise = new Promise<void>((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.send(data);

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    }
                    else {
                        // TODO: status
                        reject(/*xhr.status,*/ xhr.statusText);
                    }
                };

                xhr.onerror = () => {
                    reject(xhr.statusText);
                };
    });

        return promise;
        }
    }
}