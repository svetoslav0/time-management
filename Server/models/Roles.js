const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['admin', 'employee', 'customer'],
    required: true,
    unique: true
  },
  userRef: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Role = mongoose.model('Role', roleSchema);

const initializeRoles = async () => {
  const predefinedRoles = ['admin', 'employee', 'customer'];

  for (let roleName of predefinedRoles) {
    const roleExists = await Role.findOne({ name: roleName });
    if (!roleExists) {
      const role = new Role({ name: roleName });
      await role.save();
    }
  }
};

module.exports = { Role, initializeRoles };
