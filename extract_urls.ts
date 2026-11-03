import fs from "fs";

const text = fs.readFileSync("room_urls.txt", "utf-8");
const urls = text.split("\n").filter(u => u.includes("Hosting-U3RheVN1") || u.includes("Hosting-1048"));
const uniqueUrls = Array.from(new Set(urls));
console.log(JSON.stringify(uniqueUrls, null, 2));

