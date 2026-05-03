import { Request, Response } from "express";
import TravelEntry from "../models/TravelEntry";
import HttpStatusCodes from "../helpers/status_code_helper";

export const getAllEntries = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const entries = await TravelEntry.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(HttpStatusCodes.OK(entries));
  } catch (error) {
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while fetching entries"));
  }
};

export const getEntryById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const entry = await TravelEntry.findById(req.params.id).populate(
      "user",
      "username",
    );

    if (!entry) {
      res.status(404).json(HttpStatusCodes.NOT_FOUND("Travel entry not found"));
      return;
    }

    res.status(200).json(HttpStatusCodes.OK(entry));
  } catch (error) {
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while fetching entry"));
  }
};

export const createEntry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const entry = await TravelEntry.create({
      ...req.body,
      user: req.user?._id,
    });

    res
      .status(201)
      .json(HttpStatusCodes.OK(entry, "Entry created successfully"));
  } catch (error: any) {
    res.status(400).json(HttpStatusCodes.INVALID_ARGUMENT(error.message));
  }
};

export const updateEntry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const entry = await TravelEntry.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?._id,
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!entry) {
      res
        .status(403)
        .json(
          HttpStatusCodes.PERMISSION_DENIED(
            "Not authorized to update this entry or entry not found",
          ),
        );
      return;
    }

    res.status(200).json(HttpStatusCodes.OK(entry));
  } catch (error: any) {
    res.status(400).json(HttpStatusCodes.INVALID_ARGUMENT(error.message));
  }
};

export const deleteEntry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("User:", req.user?._id ?? "unknown");
    console.log("Entry ID:", req.params.id);
    const entry = await TravelEntry.findById(req.params.id);
    console.log("Entry owner:", entry?.user);

    if (!entry) {
      res.status(404).json(HttpStatusCodes.NOT_FOUND("Travel entry not found"));
      return;
    }

    res
      .status(200)
      .json(HttpStatusCodes.OK({}, "Travel entry deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(HttpStatusCodes.UNKNOWN("Server error while deleting entry"));
  }
};
