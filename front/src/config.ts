const isDev = process.env.NODE_ENV === "development";
const backendUrl = isDev ? "http://localhost:3500" : "https://59.127.99.53:3500";
export const API_URL = `${backendUrl}/api`;
