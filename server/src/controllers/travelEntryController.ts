import { Request, Response } from "express";
import TravelEntry from "../models/TravelEntry";

export const getAllEntries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entries = await TravelEntry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching entries",
    });
  }
};

export const getEntryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entry = await TravelEntry.findById(req.params.id);

    if (!entry) {
      res.status(404).json({
        success: false,
        error: "Travel entry not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching entry",
    });
  }
};

export const createEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entry = await TravelEntry.create(req.body);

    res.status(201).json({
      success: true,
      data: entry,
    });
  } catch (error: any) {
    console.error("Error creating entry:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Server error while creating entry",
    });
  }
};

export const updateEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entry = await TravelEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!entry) {
      res.status(404).json({
        success: false,
        error: "Travel entry not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error: any) {
    console.error("Error updating entry:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Server error while updating entry",
    });
  }
};

export const deleteEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entry = await TravelEntry.findByIdAndDelete(req.params.id);

    if (!entry) {
      res.status(404).json({
        success: false,
        error: "Travel entry not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Travel entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({
      success: false,
      error: "Server error while deleting entry",
    });
  }
};
