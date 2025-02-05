import { fileURLToPath } from "url";
import path from "node:path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export { dirname };
