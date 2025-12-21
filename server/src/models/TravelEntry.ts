import mongoose, { Schema, Document } from "mongoose";

export interface TravelEntry extends Document {
  name: string;
  location: string; // Google Maps URL
  country: string;
  about: string;
  imageUrl: string;
  googleMapsUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TravelEntrySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    location: {
      type: String,
      required: [true, "Location (Google Maps URL) is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Please provide a valid Google Maps URL",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    about: {
      type: String,
      required: [true, "About/Description is required"],
      trim: true,
      maxlength: [2000, "About cannot exceed 2000 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|jfif)$/i.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
    googleMapsUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TravelEntry>("TravelEntry", TravelEntrySchema);
