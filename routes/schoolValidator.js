const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const schoolController = require('../controller/school');

const addSchoolValidation = [
  check('name')
    .not().isEmpty().withMessage('School name is required')
    .trim(),
  check('address')
    .not().isEmpty().withMessage('Address is required')
    .trim(),
  check('latitude')
    .not().isEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  check('longitude')
    .not().isEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];

const listSchoolsValidation = [
  check('latitude')
    .not().isEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  check('longitude')
    .not().isEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];


router.post('/addSchool', addSchoolValidation, schoolController.addSchool);


router.get('/listSchools', listSchoolsValidation, schoolController.listSchools);

module.exports = router;