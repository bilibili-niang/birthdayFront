// export const baseUrl: String = `https://blog.icestone.work`;
// export const baseUrl = "http://localhost:90";


import process from "process";

export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:90" : "https://www.xyflash.top";
// export const baseUrl = "https://www.xyflash.top";

export const activeColor = "#72221c";