
export const convertObjectToParams = (query: any) => {
  if (typeof query === "string") {
    return query;
  }
  let finalQuery = "";
  Object.keys(query).forEach((key, index) => {
    if (index === 0) {
      finalQuery += "?";
    }
    finalQuery += key + "=" + query[key];
    if (index + 1 !== Object.keys(query).length) {
      finalQuery += "&";
    }
  });
  return finalQuery;
};
