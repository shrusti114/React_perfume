const Counter = require('../models/Counter');

const generateId = async (counterName, prefix) => {
  const counter = await Counter.findByIdAndUpdate(
    counterName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  
  // Format to 3 digits minimum (e.g., U001, P012, C105)
  const seqStr = counter.seq.toString().padStart(3, '0');
  return `${prefix}${seqStr}`;
};

module.exports = generateId;
