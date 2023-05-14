let processQueryStringToObj = () => {
    let lochref = document.location.href;
    let queryStr = lochref.split('?')[1];
    if(queryStr == undefined || queryStr == null) {
        return;
    }

    let queryStringObj = {};
    queryStr.split('&').forEach((keyValue) => {
        let key = keyValue.split('=')[0];
        let value = keyValue.split('=')[1];
        if(queryStringObj.hasOwnProperty(key)) {
            if(Array.isArray(queryStringObj[key])) {
                queryStringObj[key].push(value);
            } else {
                let arr = [];
                queryStringObj[key] = arr.push(queryStringObj[key]);
            }
        } else {
            queryStringObj[key] = value;
        }
    });
    return queryStringObj;
};

let populateProductDetails = (dbProductObj) => {
    if(dbProductObj == undefined || dbProductObj == null) {
        return;
    }

    let a_image_parent = document.getElementById('product_image');
    a_image_parent.innerHTML = '';
    // fill data into template
    let span_sku = document.getElementById('sku');
    let h3_product_name = document.getElementById('product_name');
    let span_offer_price = document.getElementById('offer_price');
    let p_description = document.getElementById('description');
    let p_composition_washing = document.getElementById('composition_washing');
    let img_product_image = document.createElement('img');

    span_sku.innerText = dbProductObj.sku;
    h3_product_name.innerText = dbProductObj.product_name;
    span_offer_price.innerText = dbProductObj.offer_price;
    p_description.innerText = dbProductObj.description;
    p_composition_washing.innerText = dbProductObj.composition_washing;
    img_product_image.setAttribute('src', dbProductObj.image);
    a_image_parent.appendChild(img_product_image);
};

let getProductDetails = () => {
    // get the product id from the url
    let queryStringObj = processQueryStringToObj();
    if(queryStringObj == undefined || queryStringObj == null || queryStringObj.id == undefined) {
        return;
    }

    let productID = queryStringObj.id;
    // db query to get details
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            // fill the page with details
            let dbProductObj = JSON.parse(xhr.responseText);
            populateProductDetails(dbProductObj);
        }
    };
    xhr.open('GET', `/getproductdetails?id=${productID}`);
    xhr.send();
};
getProductDetails();
