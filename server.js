const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const db = require('./db');
const cors = require('cors')
const PORT = process.env.PORT || 5000;
app.use(bodyparser.json());
app.use(cors());



app.post('/addSchool',async (req,res)=>{
   
    const { name, address, latitude, longitude } = req.body;
 
    if(!name || !address || !latitude || !longitude){
        return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
    }


    try {
    
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(query, [name, address, latitude, longitude], (err, result) => {
            if (err) {
                console.error('Error adding school:', err);
                return res.status(500).json({ error: 'Failed to add school' });
            }

        res.status(201).json({ message: "School added successfully", id: result.insertId });
        })
    }
         catch (err) {
        res.status(500).json({error:err.message});
  }   

})

function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}




app.get('/listSchools', async (req,res)=>{

const {latitude,longitude} = req.query;
if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });

}
if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
}


try {
    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({ error: 'Failed to fetch schools' });
        }
   

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const getschools  = results.map((school) => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }))

    const sortedSchools = getschools.sort((a, b) => { return  a.distance - b.distance});

    res.status(200).json(sortedSchools);
})

} catch (err) {
    res.status(500).json({ error: err.message });
}
})



app.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`);
})