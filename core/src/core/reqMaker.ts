type Body =
    | Record<string, unknown>
    | readonly Record<string, unknown>[];

export type ReqMaker = {
    get: <T>(path: string) => Promise<T>;
    post: <T>(path: string, body: Body) => Promise<T>;
    put: <T>(path: string, body: Body) => Promise<T>;
    patch: <T>(path: string, body: Body) => Promise<T>;
    delete: (path: string) => Promise<void>;
};
