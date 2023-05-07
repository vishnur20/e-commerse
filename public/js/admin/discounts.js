let addDiscount = (e) => {
    console.log('clicked');

    // get data
    let input_discount_code = document.getElementById('discount_code');
    let input_discount_value = document.getElementById('discount_value');
    let input_discount_status_enable = document.getElementById('status_enable');
    // let intput_discount_appliesto_allproducts = document.getElementById('');
    let input_start_date = document.getElementById('start_date');
    let input_end_date = document.getElementById('end_date');

    let status = input_discount_status_enable.checked ? 'enabled' : 'disabled';
    let reqPayload = {
        code: input_discount_code.value,
        percentage: input_discount_value.value,
        status: status,
        start_date: input_start_date.value,
        end_date: input_end_date.value
    };

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let resObj = JSON.parse(xhr.responseText);
        }
    };
    xhr.open('POST', '/admin/discount');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(reqPayload));
};