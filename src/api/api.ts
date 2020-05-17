import config from "config";

interface RestAPIReply<T> {
  message: object;
  data: T | Array<T>;
}

const apiFetch = async <T>(
  endpoint: string,
  method: string,
  body?: T
): Promise<T | Array<T> | string> => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const request = new Request(config.API_URL + endpoint, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  });

  try {
    const res = await fetch(request);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    try {
      return ((await res.json()) as RestAPIReply<T>).data;
    } catch {
      return await res.text();
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const get = async <T>(endpoint: string) =>
  await apiFetch<T>(endpoint, "GET");
export const post = async <T>(endpoint: string, body: T) =>
  await apiFetch(endpoint, "POST", body);
export const put = async <T>(endpoint: string, body: T) =>
  await apiFetch(endpoint, "PUT", body);
export const remove = async <T>(endpoint: string) =>
  await apiFetch<T>(endpoint, "DELETE");
