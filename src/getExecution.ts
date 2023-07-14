import { fetchExecution, FetchExecutionResponse } from "./client.js";
import { APIError } from "./errors.js";
import { __httpClient, __database } from "./index.js";

export async function getExecution(
  id: string
): Promise<FetchExecutionResponse> {
  if (__httpClient) return fetchExecution(__httpClient, { id });

  console.log("getExecution", id);

  const response = __database.get(id);
  if (response)
    return Promise.resolve({
      ...response,
      state: response.state,
    });

  throw new APIError("execution not found", "not found");
}
