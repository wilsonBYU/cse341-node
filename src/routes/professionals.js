const express = require('express')
const router = express.Router()
const professionalsController = require('../controller/professionals')

router.get('/', professionalsController.getProfessional)

module.exports = router