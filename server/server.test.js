const chakram = require('chakram');

describe("ALL API TESTS: ", () => {
  test('/GET get all products limited to count', (page = 1, count = 5) => {
    return chakram.get(`http://127.0.0.1:3000/products/?page=${page}&count=${count}`).
      then(({response}) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(count);
      })
  });


  test('/GET get specficif product info', (id = 5) => {
    return chakram.get(`http://127.0.0.1:3000/products/${id}`).
      then(({response}) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.id).toEqual(id);
      })
  });

  test('/GET get STYLES for specific product given id', (id = 5) => {
    return chakram.get(`http://127.0.0.1:3000/products/${id}/styles`).
      then(({response}) => {
        expect(response.statusCode).toEqual(200);
        console.log(response.body)
        expect(response.body.product_id).toEqual(id.toString());
        expect(response.body).toHaveProperty('results')
      })
  });
})



// http://127.0.0.1:3000/products/?page=1&count=5