import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: [true, "Username is required"], unique: true },
    name: { type: String, required: [true, "Username is required"] },
    image: { type: String },
    bio: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Community = mongoose.models.Community || mongoose.model("Community", CommunitySchema);
export default Community;
