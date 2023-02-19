import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      required: true,
    },
    branch_name: {
      type: String,
      required: true,
      unique: true,
    },
    sections: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Section",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Branch", BranchSchema);
