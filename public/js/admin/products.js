let addProduct = (e) => {
    e.preventDefault();
    // take the form data
    var input_productName = document.getElementById('product_name');
    var input_sku = document.getElementById('sku');
    var input_offerPrice = document.getElementById('offer_price');
    var radio_statusActive = document.getElementById('status_active');
    var textarea_description = document.getElementById('description');
    var status = radio_statusActive.checked ? 'active' : 'inactive'; 
    var formData = {
        product_name: input_productName.value,
        sku: input_sku.value,
        offer_price: input_offerPrice.value,
        status: status,
        description: textarea_description.value,
    };
    
    // add to db
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            consol.log(resObj);
        }
    };
    xhr.open('POST', '/admin/product');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(formData));
};

let getProducts = () => {
    // get all products as a list
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let resObj = JSON.parse(xhr.responseText);
            //
        }
    };
    xhr.open('GET', '/admin/product');
    xhr.send();
};

let constructProdectTableList = (products) => {
    let tableBody_products = document.getElementById('products_list_parent');
    products.forEach(productObj => {
        tableBody_products.appendChild(constructProdectTableItem(productObj));
    });
};

let constructProdectTableItem = (productObj) => {
    let productDetails = ['image', 'product_name', 'sku', 'price', 'count_in_inventory', 'status'];
    let tr_product = document.createElement('tr');
    for(let i = -1; i < productDetails.length; i++) {
        if(i == -1) {
            let input_checkbox = document.createElement('input');
            input_checkbox.setAttribute('type', 'checkbox');
            input_checkbox.setAttribute('name', 'prod-item');
            td_property.appendChild(input_checkbox);
            tr_product.appendChild(td_property);
            continue;
        }
        let propertyName = productDetails[i];
        let td_property = document.createElement('td');
        if(propertyName === 'image' && productObj.hasOwnProperty(propertyName)) {
            let imageUrl = productObj[propertyName];
            let span_wrap = document.createElement('span');
            span_wrap.setAttribute('class', 'admin-list-img');
            let img_prodImage = document.createElement('src', '' + imageUrl);
            img_prodImage.setAttribute('alt', 'product image');
            span_wrap.appendChild(img_prodImage);
            td_property.appendChild(span_wrap);
        } else if(propertyName === 'product_name' && productObj.hasOwnProperty(propertyName)) {
            let a_wrap = document.createElement('a');
            a_wrap.setAttribute('href', '/admin/editproduct?id=' + productObj.sku);
            td_property.innerText = productObj[propertyName];
            td_property.appendChild(a_wrap);
        } else {
            if(productObj.hasOwnProperty(propertyName)) {
                if(propertyName === 'status') {
                    if(productObj[propertyName].trim().toLowerCase() === 'active') {
                        td_property.setAttribute('class', 'color-green');
                    } else if(productObj[propertyName].trim().toLowerCase() === 'inactive') {
                        td_property.setAttribute('class', 'color-red');
                    }
                } else if(propertyName === 'price') {
                    td_property.innerHTML += '$';
                }
            }
            td_property.innerText += productObj[propertyName];
        }
        tr_product.appendChild(td_property);
    }
};

getProducts();