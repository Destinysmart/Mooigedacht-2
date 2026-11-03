import fs from "fs";

async function run() {
  const res = await fetch("https://www.airbnb.co.uk/rooms/1048991010574715381");
  const text = await res.text();
  const match = text.match(/https?:\/\/[^\"]+\.(?:jpg|jpeg|webp|png)/gi);
  if (match) {
    fs.writeFileSync("room_urls.txt", match.join("\n"));
    console.log("Saved to room_urls.txt");
  } else {
    console.log("No match found");
  }
}
run();
