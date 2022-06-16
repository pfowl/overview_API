require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT;
const handler = require('./handler.js')
const app = express();


app.get(`/products`, (req, res) => {
  const { page, count } = req.query;
  handler.getAllProduct(Number(page) || 1, Number(count) || 10).
    then(data => {
      res.send(data.rows)
    }).
      catch(err => {
        res.end();
      });
});

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params || 1;

  handler.getProduct(product_id).
    then(data => res.send(data.rows[0].json_build_object)).
      catch(err => {
        res.end();
      })
});

app.get('/products/:product_id/styles', (req, res) => {
  const {product_id} = req.params || 1;
  let returnRes = {product_id}
  handler.getProductStyles(product_id).
    then(data => {
      returnRes.results = data.rows[0].json_agg;
      res.send(returnRes);
    }).
      catch(err => {
        res.end();
      });
});

app.get(`/products/:product_id/related`, (req, res) => {
  const {product_id} = req.params || 1;
  handler.getRelatedProducts(product_id).
    then(data => {
      res.send(data.rows[0].json_agg)
    }).
      catch(err => {
        res.end();
      })
});
app.listen(PORT);