type method = "GET" | "POST" | "PATCH" | "DELETE";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function customFetch<T>(
    method: method,
    resource: string,
    content?: object,
): Promise<T> {
    const localstorageToken = window.localStorage.getItem(
        "@NOW_MENU/user/token",
    );
    const authorization =
        localstorageToken && JSON.parse(localstorageToken)?.token
            ? `Bearer ${JSON.parse(localstorageToken).token}`
            : "";

    return fetch(`${baseURL}/${resource}`, {
        method,
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            authorization,
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(content),
    }).then((res) => {
        if (res.status === 401) {
            window.localStorage.removeItem("@NOW_MENU/user/token");
        }
        if (!res.ok) throw new Error(res.statusText);
        if (res.status === 204) return;
        return res.json();
    });
}

function getFetch<T>(resource: string, content?: object) {
    return customFetch<T>("GET", resource, content);
}

function postFetch<T>(resource: string, content?: object) {
    return customFetch<T>("POST", resource, content);
}

function patchFetch<T>(resource: string, content?: object) {
    return customFetch<T>("PATCH", resource, content);
}

function deleteFetch<T>(resource: string, content?: object) {
    return customFetch<T>("DELETE", resource, content);
}

export const Fetch = {
    get: getFetch,
    post: postFetch,
    patch: patchFetch,
    delete: deleteFetch,
};
