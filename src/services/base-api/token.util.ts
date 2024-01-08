export const getToken = (toke:string) => {
  const token = localStorage.getItem(toke);
  if (!token) {
    return null;
  }

  if (token) {
    return token;
  }
};
