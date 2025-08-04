const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const csv = require('csv-parse');
const fs = require('fs');
require('dotenv').config();
const Hospitals = require('./model/Hospitals');

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

const port = 5000;

const upload = multer({ dest: 'uploads/' });

app.get("/", (req,res) => {
    res.send({
        onlineMessage: "You are currently online."
    });
})

app.listen(port, () =>
    console.log(`Medsoft express server now running on port ${port}`)
    );

if (!process.env.MONGODB_URI) {
  console.error('MongoDB connection string is undefined. Please check your .env file.');
  process.exit(1);
}

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI + 'medsoftdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Possible issues: Invalid connection string, network connectivity, or IP not in Atlas allowlist.');
    }
    process.exit(1);
  });

  app.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospitals.find({});
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).send({ error: error.message });
  }
});

// Modify the POST endpoint for better error handling
app.post("/add", upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ 
      columns: true, 
      trim: true,
      skip_empty_lines: true 
    }))
    .on('data', (data) => {
      try {
        // Log incoming data for debugging
        console.log('Processing row:', data);

        const hospital = {
          name: data.name || data.Name, // Handle different case in CSV headers
          latitude: parseFloat(data.latitude || data.Latitude),
          longitude: parseFloat(data.longitude || data.Longitude),
          HospitalsType: data.HospitalsType || data['Hospital Type'] || data.type || data.Type,
          city: data.city || data.City,
          location: {
            latitude: parseFloat(data.latitude || data.Latitude),
            longitude: parseFloat(data.longitude || data.Longitude)
          }
        };

        // Validate required fields
        if (!hospital.name || isNaN(hospital.latitude) || isNaN(hospital.longitude) || !hospital.HospitalsType) {
          console.error('Invalid row data:', data);
          return;
        }

        results.push(hospital);
      } catch (error) {
        console.error('Error processing row:', error, data);
      }
    })
    .on('end', async () => {
      try {
        console.log('Processed results:', results);

        if (results.length === 0) {
          throw new Error('No valid hospital data found in CSV');
        }

        // Validate hospital types
        const validResults = results.filter(hospital => 
          ['Primary', 'Secondary', 'Tertiary'].includes(hospital.HospitalsType)
        );

        if (validResults.length === 0) {
          throw new Error('No valid hospital types found');
        }

        // Insert into MongoDB
        const inserted = await Hospitals.insertMany(validResults);
        console.log('Inserted documents:', inserted);

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.status(200).send({ 
          message: 'Data imported successfully',
          imported: validResults.length,
          total: results.length
        });
      } catch (error) {
        console.error('MongoDB insertion error:', error);
        res.status(500).send({ 
          error: error.message,
          details: 'Failed to insert data into MongoDB'
        });
      }
    })
    .on('error', (error) => {
      console.error('CSV parsing error:', error);
      res.status(500).send({ 
        error: 'Failed to parse CSV',
        details: error.message
      });
    });
});