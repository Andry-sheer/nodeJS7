import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getLocalFiles = async () => {
  try {
    const filePath = path.join(__dirname, "../database/books.json");
    const data = await readFile(filePath, "utf-8");
    const parseData = JSON.parse(data);
    return parseData;
  } catch (error) {
    console.error("error: read file or file not found");
    throw error;
  }
};
