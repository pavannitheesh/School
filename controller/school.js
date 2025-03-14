const {addSchool,getAllSchools} = require('../models/schoolModel');
const { calculateDistance } = require('../utils/geo');
const { validationResult } = require('express-validator');

exports.addSchool = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, address, latitude, longitude } = req.body;
    
    
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
  
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(200).json({
        success: false,
        message: 'Latitude and longitude must be valid numbers'
      });
    }
    
    
    const newSchool = await addSchool({
      name,
      address,
      latitude: lat,
      longitude: lng
    });
    
    res.status(201).json({
      success: true,
      data: newSchool,
      message: 'School added successfully'
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding school'
    });
  }
};


exports.listSchools = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

   
    const { latitude, longitude } = req.query;
    
    
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    
   
    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(200).json({
        success: false,
        message: 'Latitude and longitude must be valid numbers'
      });
    }
    

    const schools =  await getAllSchools();
    
    
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        school.latitude, 
        school.longitude
      );
      
      return {
        ...school,
        distance: parseFloat(distance.toFixed(2)) 
      };
    });
    
    
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      data: sortedSchools,
      message: 'Schools retrieved successfully'
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while listing schools'
    });
  }
};