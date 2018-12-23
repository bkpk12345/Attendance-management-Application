const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SettleInDB',{ useNewUrlParser: true });
const SettleInSchema = new mongoose.Schema({
    firstname: { type: String, default: 'default firstname' },
    lastname: { type: String, default: 'default lastname' },
    password: {type: String, default: 'pass' },
    email: { type: String, default: 'hahaha' },
    phone: { type: Number},
    dob: { type: Date },

    attendance:
    [
        {
            date:{
           
                type:Date,
                default:Date.now
            },
            entry:{type:Date}
        
        }
    ]
});

const user = new mongoose.model('user', SettleInSchema);

module.exports = user;

