const States = require("../models/states");

const asyncHandler = require("express-async-handler");
const { response } = require("express");

/**
 * @desc Get all states
 * @route GET /states
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const getAllStates = asyncHandler(async (req, res) => {
  const states = await States.find().lean();
  if (!states?.length) res.status(400).json({ message: "No states found" });
  else res.json(states);
});

/**
 * @desc Create new employee
 * @route CREATE /states
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const createNewState = asyncHandler(async (req, res) => {
  const newState = await new States({
    ...req.body   
})

  const states = await States.create(newState);

  if (states) res.status(201).json({ message: "New state created" });
  else res.status(400).json({ message: "Invalid state data received" });
});

/**
 * @desc Update states
 * @route UPDATE /states
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const updateState = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    abbreviation,
   
  } = req.body;

  // confirm Data
  if (
    !id ||
    !name ||
    !abbreviation 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const state = await States.findById(id).exec();
  if (!state) res.status(400).json({ message: "state not found" });

  // check for duplicate
  const duplicate = await States.findOne({name}).lean().exec();
  // Allow updates to the original state
  if (duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate state" });
  }
  state.name = name;
  state.abbreviation = abbreviation;

  const updatedState = await state.save()

  res.json({message: `${updatedState.name} updated`})
});

/**
 * @desc Delete state
 * @route DELETE /States
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const deleteState = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        res.send(400).json({message: 'State ID Required'})
    }
    const state = await States.findById(id).exec()
    if(!state){
        return res.status(400).json({massage:'State not found'})
    }

    const result = await state.deleteOne()
    const messageReply = `State ${result.name} with ID ${result._id} deleted`

    res.json(messageReply)
});

module.exports = {
  getAllStates, 
  createNewState, 
  updateState, 
  deleteState
};