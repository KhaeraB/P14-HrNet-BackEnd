const Departments= require("../models/departments");

const asyncHandler = require("express-async-handler");
const { response } = require("express");

/**
 * @desc Get all departments
 * @route GET /departments
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Departments.find().lean();
  if (!departments?.length) res.status(400).json({ message: "No departments found" });
  else res.json(departments);
});

/**
 * @desc Create new department
 * @route CREATE /department
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const createNewDepartment = asyncHandler(async (req, res) => {
  const newDepartment = await new Departments({
    ...req.body   
})

  const department = await Departments.create(newDepartment);

  if (department) res.status(201).json({ message: "New department created" });
  else res.status(400).json({ message: "Invalid department data received" });
});

/**
 * @desc Update department
 * @route UPDATE /departments
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const updateDepartment = asyncHandler(async (req, res) => {
  const {
    id,
    name
   
  } = req.body;

  // confirm Data
  if (
    !id ||
    !name
   
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const department = await Departments.findById(id).exec();
  if (!department) res.status(400).json({ message: "Department not found" });

  // check for duplicate
  const duplicate = await Departments.findOne({name}).lean().exec();
  // Allow updates to the original department
  if (duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate department" });
  }
    department.name = name;

  const updatedDepartment = await department.save()

  res.json({message: `${updatedDepartment.name} updated`})
});

/**
 * @desc Delete department
 * @route DELETE /departments
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const deleteDepartment = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        res.send(400).json({message: 'Department ID Required'})
    }
    const department = await Departments.findById(id).exec()
    if(!department){
        return res.status(400).json({massage:'Employee not found'})
    }

    const result = await department.deleteOne()
    const messageReply = `Department ${result.name} with ID ${result._id} deleted`

    res.json(messageReply)
});

module.exports = {
 getAllDepartments, 
 createNewDepartment, 
 updateDepartment, 
 deleteDepartment
};