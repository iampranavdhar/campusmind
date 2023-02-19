import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    org_id: {
      type: String,
      require: true,
    },
    profile_image: {
      type: String,
      default: "",
    },
    batch_details: {
      branch_name: {
        type: String,
        default: "",
      },
      section_name: {
        type: String,
        default: "",
      },
      branch_id: {
        type: String,
        default: "",
      },
      section_id: {
        type: String,
        default: "",
      },
    },
    user_full_name: {
      type: String,
      require: true,
      unique: true,
    },
    user_identity: {
      type: String,
      min: 5,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    todo_board: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TodoBoard",
      },
    ],
    cgpa: {
      type: Number,
      default: 0,
    },
    semDetails: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SemDetails",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
