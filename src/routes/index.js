const express = require("express");
const itemRouter = require("./item.routes.js");
const item_order_customerRouter = require("./item_order_customer.routes.js");
const optionRouter = require("./option.routes.js");
const order_customerRouter = require("./order_customer.routes.js");
const order_itemRouter = require("./order_item.routes.js");

const router = express.Router();

const defaultRouters = [
  {
    path: "/item",
    router: itemRouter,
  },
  {
    path: "/item_order_customer",
    router: item_order_customerRouter,
  },
  {
    path: "/option",
    router: optionRouter,
  },
  {
    path: "/order_customer",
    router: order_customerRouter,
  },
  {
    path: "/order_item",
    router: order_itemRouter,
  },
];

defaultRouters.forEach((r) => {
  router.use(r.path, r.router);
});

module.exports = router;
