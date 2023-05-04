var addProduct = () => {
    // take the form data
    var form_productForm = document.getElementsById('productform');
    var input_productName = document.getElementById('productname');
    var input_sku = document.getElementById('sku');
    var input_price = document.getElementById('price');
    var radio_statusActive = document.getElementById('status_active');
    var textarea_description = document.getElementById('description');
    
    var status = radio_statusActive.checked ? 'active' : 'inactive'; 
    var formData = {
        productname: input_productName.ariaValueMax,
        sku: input_sku.value,
        price: input_price.value,
        status: status,
        description: textarea_description.value,
        
    };
    
    // add to db
};