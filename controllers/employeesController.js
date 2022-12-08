const Employees = require("../models/employees");

const asyncHandler = require("express-async-handler");
const { response } = require("express");

/**
 * @desc Get all employees
 * @route GET /employees
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employees.find().lean();
  if (!employees?.length) res.status(400).json({ message: "No employees found" });
  else res.json(employees);
});

/**
 * @desc Create new employee
 * @route CREATE /employees
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const createNewEmployee = asyncHandler(async (req, res) => {
  const newEmployee = await new Employees({
    ...req.body   
})

  const employee = await Employees.create(newEmployee);

  if (employee) res.status(201).json({ message: "New employee created" });
  else res.status(400).json({ message: "Invalid employee data received" });
});

/**
 * @desc Update employee
 * @route UPDATE /employees
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const updateEmployee = asyncHandler(async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    birthDate,
    startDate,
    street,
    city,
    state,
    zipCode,
    department,
  } = req.body;

  // confirm Data
  if (
    !id ||
    !firstName ||
    !lastName ||
    !birthDate ||
    !startDate ||
    !street ||
    !city ||
    !state ||
    !zipCode ||
    !department
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = await Employees.findById(id).exec();
  if (!employee) res.status(400).json({ message: "Employee nor found" });

  // check for duplicate
  const duplicate = await Employees.findOne({firstName}).lean().exec();
  // Allow updates to the original employee
  if (duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate employee" });
  }
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.birthDate = birthDate;
  employee.startDate = startDate;
  employee.street = street;
  employee.city = city;
  employee.state = state;
  employee.zipCode = zipCode;
  employee.department = department;

  const updatedEmployee = await employee.save()

  res.json({message: `${updatedEmployee.lastName} updated`})
});

/**
 * @desc Delete employee
 * @route DELETE /employees
 * @param {any} async(req
 * @param {any} res
 * @returns {any}
 */
const deleteEmployee = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        res.send(400).json({message: 'Employee ID Required'})
    }
    const employee = await Employees.findById(id).exec()
    if(!employee){
        return res.status(400).json({massage:'Employee not found'})
    }

    const result = await employee.deleteOne()
    const messageReply = `Employee ${result.firstName} with ID ${result._id} deleted`

    res.json(messageReply)
});

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee
};
