import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,  // Changed to Number
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],  // This could be ObjectIds if you have a separate Room model
        required: false // Optional unless rooms are required for a hotel
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });  // Adding timestamps for createdAt and updatedAt

export default mongoose.model("Hotel", HotelSchema);
