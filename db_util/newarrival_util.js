const NewArrival = require('../models/NewArrival');
const mongoose = require('mongoose');
const db = () => {
    return mongoose.connection;
};

const NewArrival = {};
NewArrival.select = {};
NewArrival.select.getAllNewArrivals = async() =>{
    try {
        return await db.collection('NewArrivals').find().toArray();
    } catch(err) {

    }
};

NewArrival.insert();
NewArrival.update();
NewArrival.delete();