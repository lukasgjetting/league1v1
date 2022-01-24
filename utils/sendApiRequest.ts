type RequestOptions = {
    method?: 'get' | 'post' | 'patch' | 'delete';
    body?: object;
}

const sendApiRequest = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    const result = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: options.method,
        body: options.body == null ? undefined : JSON.stringify(options.body),
    });
    const json = await result.json();

    return json;
}

export default sendApiRequest;