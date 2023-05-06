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
    var xhr = new XMLHttpRequest();
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