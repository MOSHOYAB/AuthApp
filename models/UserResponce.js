const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
    userId: String,
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    responses: [{ questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answers: [String] }],
    score: Number,
  });
  const UserResponse = mongoose.model('UserResponse', userResponseSchema);
  module.exports = UserResponse;