const { Types } = require('mongoose');
const Test = require("../models/Test");
const question = require("../models/question");
const Response = require("../models/UserResponce");
const {default:mongoose}=require("mongoose");




exports.test = async (req, res) => {  
  try {
    const { userId, testId, responses } = req.body;
    console.log('testId:', testId);
    console.log('typeof testId:', typeof testId);


    const isValidObjectId = new mongoose.Types.ObjectId(testId);
    console.log('isValidObjectId:', isValidObjectId);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid testId' });
    }

  
    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
 
    const userResponse = new Response({
      userId,
      testId: testObjectId,
      responses,
      score,
    });
    await userResponse.save();

    
    return res.json({ userId, testId, score });
  }  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit test',
    });
  }
}
