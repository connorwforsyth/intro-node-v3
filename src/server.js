import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import { formatNotes, interpolate } from "./utils.js";

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    if (req.url === "/special") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("here is a special page.");
    } else {
      const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
      const template = await fs.readFile(HTML_PATH, "utf-8");
      const html = interpolate(template, { notes: formatNotes(notes) });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    }
  });
};

const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};

export { start };
