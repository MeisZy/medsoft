const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const HospitalsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  HospitalsType: {
    type: String,
    required: true,
    enum: ['Primary', 'Secondary', 'Tertiary']
  },
  city: {
    type: String,
    required: false,
    trim: true
  },
  location: {
    type: locationSchema,
    required: true
  }
}, {
  timestamps: true
});

const Hospitals = mongoose.model('Hospitals', HospitalsSchema);

module.exports = Hospitals;