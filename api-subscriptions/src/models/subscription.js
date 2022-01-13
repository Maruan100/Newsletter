import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const subscriptionSchema = Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: false },
  gender: { type: String, required: false },
  dateOfBirth: { type: Date, required: true },
  active: { type: Boolean, default: true },
  campaignId: { type: ObjectId, required: true },
});

export default mongoose.model("Subscription", subscriptionSchema);
