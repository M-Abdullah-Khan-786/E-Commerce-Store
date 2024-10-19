const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = getToken
  ? {
      headers: {
        Authorization: `Bearer ${getToken.token}`,
        "Content-Type": "application/json",
      },
    }
  : {};