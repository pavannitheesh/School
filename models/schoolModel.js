const  pool  = require('../config/db');


exports.addSchool= async ({name,address,latitude,longitude}) =>{
    try {
      
      
      const [result] =  await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );
 
      
      return {
        id: result.insertId,
       name,address,latitude,longitude
      };
    } catch (error) {
      throw error;
    }
  }
  exports.getAllSchools=async(req,res)=> {
    try {
      const [rows] =await  pool.query('SELECT * FROM schools');
      return rows;
    } catch (error) {
      throw error;
    }
  }