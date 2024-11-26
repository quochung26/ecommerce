export class HttpError extends Error {
  status: number;
  constructor(message: string, { status }: { status: number }) {
    super(message);
    this.status = status;
  }
}

export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  options?: Omit<RequestInit, "method" | "body">
) => {
  const fullUrl = url.startsWith("/api")
    ? url
    : new URL(url, process.env.NEXT_PUBLIC_API_ENDPOINT);

  const headers = new Headers(options?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept-Encoding", "gzip");
  headers.set("Accept", "application/json");

  const requestOptions: RequestInit = {
    ...options,
    method,
    headers,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const res = await fetch(fullUrl.toString(), requestOptions);

  const data = await res.json();

  if (!res.ok) {
    throw new HttpError(data.message, { status: res.status });
  }

  return data;
};
