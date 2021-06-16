// formi authors route ya 
const mongoose=require('mongoose')
const authorSchema = new mongoose.Schema({
    name:{
      type: String,
    required: true
    }
})
module.exports = mongoose.model('Author',authorSchema) // darein mongoose.model hata modelaki nwe drustkaen u passe schemayakae dakaen