import { useMutation } from "react-query";

export function useGetMockedImage() {
    return useMutation(
        (): Promise<{ image: string }> =>
            fetch("https://foodish-api.herokuapp.com/api/", {
                method: "GET",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                referrerPolicy: "no-referrer",
            }).then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                if (res.status === 204) return;
                return res.json();
            }),
    );
}
