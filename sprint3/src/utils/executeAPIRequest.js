import { executeHTTPRequest, options } from "../services/queryService";

export const executeAPIRequest = async ({
  pageParam = null,
  resourceIdentifier = null,
  data,
  endpoint = null,
  PropertyBody = "get",
  token = null,
}) => {
  if (!PropertyBody) {
    throw new Error("PropertyBody is missing");
  }

  const endpointURL =
    resourceIdentifier && pageParam
      ? `${endpoint}/${resourceIdentifier}?page=${pageParam}`
      : resourceIdentifier
        ? `${endpoint} /${resourceIdentifier}`
        : pageParam
          ? `${endpoint}?page = ${pageParam}`
          : endpoint;


  const conf = options?.[PropertyBody](token, data);
  const res = await executeHTTPRequest(endpointURL, conf);

  return res;
};