const express = require('express')
const router = express.Router()
const departmentsController = require('../controllers/departmentsController')


router.route('/')
    .get(departmentsController.getAllDepartments)
    .post(departmentsController.createNewDepartment)
    .patch(departmentsController.updateDepartment)
    .delete(departmentsController.deleteDepartment)

module.exports = router