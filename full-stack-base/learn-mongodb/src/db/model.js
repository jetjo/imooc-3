const mongoose = require('./db');

const GirlSchema = new mongoose.Schema(
  {
    xx: String,
    name: {
      type: String,
      required: true,
      unique: false//此处只有在最开始创建集合时有效，之后改就不管用了
    },
    age: Number,
    city: String,
    price: {
      type: Number,
      default: 3000,
      // unique: 
    }
  },
  {
    timestamps: true
  }
)

const Girl = mongoose.model('LearnFuckingGirl', GirlSchema);

// mongoose.disconnect();

const kitty = new Girl({ name: '柳如是' + Math.random().toFixed(5), age: 18 })

kitty.save().then(_ => console.log('girl is ready!!!'));//.finally(_ => mongoose.disconnect())

module.exports = {
  Girl,
  GirlSchema
}
