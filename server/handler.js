const { pool } = require('../db.js');

module.exports.getAllProduct = async (page = 1, count = 5) => {
  let offsetRows = page * count - count;
  console.log(typeof page, typeof count, offsetRows)
  return await pool.query(`SELECT * from product where id > ${offsetRows} ORDER BY id ASC LIMIT ${count};`)
};

module.exports.getProduct = async (product_id) => {
  return await pool.query(`SELECT json_build_object(
    'id', product.id,
    'name', product.name,
    'slogan', product.slogan,
    'description', product.description,
    'category', product.category,
    'default_price', product.default_price,
    'features', (
        SELECT json_agg(json_build_object(
            'feature', features.feature,
            'value', features.value
        )) FROM features WHERE features.product_id = product.id
    )
  )
   FROM product
   WHERE id = ${product_id};`);
};

module.exports.getProductStyles = async (product_id) => {
  return await pool.query(`SELECT json_agg(json_build_object(
    'style_id', id,
    'name', name,
    'original_price', original_price,
    'sale_price', sale_price,
    'default?', default_style,
    'photos', (
        Select json_agg(json_build_object(
        'thumbnail_url', photos.thumbnail_url,
        'url', photos.url
        )) FROM photos WHERE photos.style_id = styles.id
    ),
    'skus', (
      Select json_object_agg(
          skus.id, json_build_object(
          'quantity', skus.quantity,
          'size', skus.size
      )) FROM skus WHERE skus.style_id = styles.id
  )
))
FROM (
    SELECT * from styles WHERE styles.product_id = ${product_id}
) AS styles`);
  // Then assign obj.result to the returned database
};

module.exports.getRelatedProducts = async (product_id) => {
  return await pool.query(`SELECT json_agg(
    related_product_id
    ) from related where current_product_id = ${product_id}`)
};