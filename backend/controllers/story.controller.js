import { uploadCloudinary } from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";

export const UploadStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "media type is required!",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.story) {
      await Story.findByIdAndDelete(user.story);
    }

    const { mediaType } = req.body;
    const mediaResult = await uploadCloudinary(req.file.path);
    if (!mediaResult) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed!",
      });
    }

    console.log("story upload", mediaResult);
    const story = await Story.create({
      author: req.userId,
      mediaType,
      media: mediaResult,
    });

    user.story = story._id;
    await user.save();

    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");

    return res.status(200).json({
      success: true,
      message: "story uploaded successfully!",
      story: populatedStory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `story upload error ${error}`,
    });
  }
};

export const viewStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(400).json({
        success: false,
        message: "story is not define!",
      });
    }

    const viewerIds = story.viewers.map((id) => id.toString());

    if (!viewerIds.includes(req.userId)) {
      story.viewers.push(req.userId);
      await story.save();
    }

    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");

    return res.status(200).json({
      success: true,
      message: "story view successfully!",
      populatedStory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `view story error ${error}`,
    });
  }
};

export const getStoryByUserName = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "username is not define!",
      });
    }

    const story = await Story.find({ author: user._id })
  .populate("author", "name userName profileImage") 
    .populate("viewers", "name userName profileImage");
    return res.status(200).json({
      success: true,
      message: "story get successfully!",
      story,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get Story By UserName error ${error}`,
    });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "Current user not found",
      });
    }

    const followingIds = currentUser.following || [];

    const stories = await Story.find({ author: { $in: followingIds } })
      .populate("author", "name userName profileImage") 
      .populate("viewers", "name userName profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "all stories fetched!",
      stories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `all stories fetching error ${error.message}`,
    });
  }
};
