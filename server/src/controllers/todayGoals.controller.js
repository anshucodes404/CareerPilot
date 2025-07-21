import { TodayGoal } from "../models/todayGoals.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTodayGoals = asyncHandler(async (req, res) => {
  console.log("getrequest")
  const user = req.auth();
  const userId = user.userId;

  // Fetch all today goals for the user
  const userDocs = await TodayGoal.find({ userId }); // <-- FIXED
  console.log(userDocs)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userDocs, // <-- FIXED
        "Today Goals of the user found"
      )
    );
});

const addTodayGoals = asyncHandler(async (req, res) => {
  const user = req.auth();
  const userId = user.userId;
  const { goalText } = req.body;

  if (!goalText) {
    throw new ApiError(400, "Text of goal is missing");
  }

  let goal;
  try {
    goal = await TodayGoal.create({ userId, goalText });
    console.log("Goal is created", goal);

    // push the goal's _id to user's todayGoals array
    await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          todayGoals: goal._id,
        },
      }
    );

    console.log(goal)
    return res
      .status(200)
      .json(new ApiResponse(200, goal, "Goal created successfully"));
  } catch (err) {
    console.error("Error creating TodayGoal:", err);
    throw new ApiError(500, "Failed to create TodayGoal");
  }
});

export { addTodayGoals, getTodayGoals };
