import dbConnect from "./config/mongoose.js";
import { insertData } from "./model/index.js";
async function main() {
  await dbConnect();
  await insertData();
}

await main();
