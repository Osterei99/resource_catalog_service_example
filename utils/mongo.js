// utils/mongo.js
import mongoose from "mongoose";
const { Types } = mongoose;

// Prüft & konvertiert String -> ObjectId; wirft 400 bei ungültigem Input
export function toObjectId(id) {
  if (!Types.ObjectId.isValid(id)) {
    const err = new Error("Ungültige ObjectId");
    err.status = 400;
    throw err;
  }
  return new Types.ObjectId(id);
}

// Mappt Mongo-Dokumente auf API-freundliches Format: _id -> id (String)
export function toClient(doc) {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

