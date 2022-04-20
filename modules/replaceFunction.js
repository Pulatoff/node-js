module.exports = (html, obj) => {
  let out = html;
  out = out.replace(/{NameProduct}/g, obj.productName);
  out = out.replace(/{imgProduct}/g, obj.image);
  out = out.replace("{organic}", obj.organic ? "organic" : "");
  out = out.replace("{quantity}", obj.quantity);
  out = out.replace(/{priceProduct}/g, obj.price);
  out = out.replace("{idProduct}", obj.id);
  out = out.replace("{productFrom}", obj.from);
  out = out.replace("{vitamins}", obj.nutrients);
  out = out.replace("{decriptionProduct}", obj.description);
  return out;
};
