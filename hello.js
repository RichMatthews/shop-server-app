const updateProduct = (p) => ({
  ...p,
  discountPrice: p.couponApplied ? p.price * p.couponDiscount : p.price
})

const transform = ({products, ...rest}) => ({
  ...rest,
  products: products.map(updateProduct)
})

const modify = (req, res, next) => {
  if (req.path !== '/my-route') return next();

  res.body = JSON.stringify(transform(JSON.parse(res.body)))
  next();
}

(() => {
  const req = {path: '/my-route'};
  const res = {body: `{"products":[{"name":"football","id":"SPO-001","category":"sport","price":40,"couponApplied":false,"coupons":["daw124qdw","a1212cxn"]},{"name":"helmet","id":"SPO-042","category":"sport","price":50,"couponApplied":true,"couponDiscount":0.75,"coupons":["foobarbaz"]}]}`}
  const next = () => {console.log(JSON.parse(res.body))}

  modify(req, res, next)
})()
