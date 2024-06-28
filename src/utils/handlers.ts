export const getApiError = (data: any) => {
  let error = "";

  if (typeof data === "string") {
    error = data;
  } else if (data?.error) {
    error = data.error;
  } else if (data?.response?.data?.error) {
    error = data.response.data.error;
  } else if (data?.message) {
    error = data.message;
  }

  return error;
};
