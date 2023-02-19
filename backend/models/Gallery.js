import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", GallerySchema);
