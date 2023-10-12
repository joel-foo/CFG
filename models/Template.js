const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    lowercase: true,
    minLength: 10,
  },
  age: {
    required: true,
    type: Number,
    validate: {
      validate: x => x % 2 == 0,
      message: props => `${props.value} is not an even number`,
    },
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    //can use .populate() like a join. for all best friend ids, go find all the objects and put it into the containing object
    ref: 'Data',
  },
  hobbies: [String],
  address: addressSchema,
});

// can call
// const user = await User.findOne({name: 'john'})
// user.sayHi()
userSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`);
};

// await User.findByName
// return query
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

// this is chainable on the QUERY
// User.find().byName('john')
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

// can call user.namedEmail
userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`;
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.post('save', function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model('User', userSchema);
