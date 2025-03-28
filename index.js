import express from "express";
import path from "path";

const app = express();
const PORT = 3003;

app.use(express.json());
app.use("/api", await import("./Server/server.js").then((m) => m.default));

let sites = [
  { site: "", protection: "none" },
  { site: "/login", protection: "none" },
  { site: "/signup", protection: "none" },
  { site: "/mail", protection: "users" },
  { site: "/mail/view", protection: "users" },
  { site: "/mail/compose", protection: "users" },
  { site: "/account", protection: "users" },
];

const hiddenRoutes = ["/middleware.js"]

for (let i of sites) {
  app.get([i.site, i.site+'/', i.site + "/index.js"], (req, res, next) => {
    if (req.url.lastIndexOf("/") !== req.url.length - 1 && !req.url.includes("?")) {
      return res.redirect(req.url + "/");
    }
    if (i.protection === "users") {
      return import("./Client/middleware.js").then((m) => m.default(req, res, next));
    }
    return res.sendFile(path.join(process.cwd(), `Client${i.site}/index.html`));
  });
}

for (let i of hiddenRoutes) {
  app.get(i, (_req, res) => {
    res.sendFile(path.join(process.cwd(), "Client/404/index.html"));
  });
}

app.use(express.static(path.join(process.cwd(), "Client"), {  }));

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "Client/404/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
