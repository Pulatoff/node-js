const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");
const createCards = require("./modules/replaceFunction");

const overview = fs.readFileSync("./templates/overview.html", "utf-8");
const cart = fs.readFileSync("./templates/cart.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const product = fs.readFileSync("./templates/product.html", "utf-8");
let dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const urlcha = req.url;
  let query = +url.parse(urlcha, true).query.id;
  if (urlcha === "/overview" || urlcha === "/") {
    let changes = dataObj
      .map((val) => {
        return createCards(cart, val);
      })
      .join("");
    let render = overview.replace("{cartProduct}", changes);
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(render);
  } else if (urlcha === `/product?id=${query}`) {
    let object = dataObj.find((val) => val.id === query);
    let productHTML = createCards(product, object);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(productHTML);
  } else {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen("8000", "127.0.0.1");
