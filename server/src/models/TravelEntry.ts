import mongoose, { Schema, Document } from "mongoose";

export interface TravelEntry extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  location: string; // Google Maps URL
  country: string;
  about: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const TravelEntrySchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
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
  },
  { timestamps: true }
);

export default mongoose.model<TravelEntry>("TravelEntry", TravelEntrySchema);
