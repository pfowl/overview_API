## overview_API
This project is api server for a front-end project. The front-end is located in https://github.com/pfowl/supernova-retail-app

### To run 
clone to your local machine: ```git clone: https://github.com/pfowl/overview_API.git```  
go to root folder then run: ```npm install```  
create .env file on root folder: ```vim .env``` then press 'i'  
pate: PORT=3000  
click esc, then ':' then 'wq'  

now run ```npm run server-dev```  
  

### API Documentaion
/products/?page=x&count=y      
where x and y are integers  
```  
[
   
    {
        "id": int,
        "name": string,
        "slogan": string,
        "description": string,
        "category": string,
        "default_price": float
    }, ...
]
```

/porduct/x/styles  
where x is an integer  
```  
{
    "product_id": "integer",
    "results": [
        {
            "style_id": int,
            "name": string,
            "original_price": float,
            "sale_price": float,
            "default?": bool,
            "photos": array,
            "skus": {
                "int": {
                    "quantity": int,
                    "size": string
                },
                ...
            }
        },
       ...
   ]
}
```  

/products/x  
where x is an intger prodct id
```  
{
    "id": intgeger,
    "name": string,
    "slogan": string,
    "description": string,
    "category": string,
    "default_price": 65,
    "features": [
        {
            "feature": "string",
            "value": "string"
        },
        ...
    ]
}
```

    




