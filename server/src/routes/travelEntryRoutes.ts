import express from "express";
import { verifyJWT } from "../middleware/auth";
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../controllers/travelEntryController";

const router = express.Router();

router.get("/", getAllEntries);
router.get("/:id", getEntryById);
router.post("/", verifyJWT, createEntry);
router.put("/:id", verifyJWT, updateEntry);
router.delete("/:id", deleteEntry);

export default router;
