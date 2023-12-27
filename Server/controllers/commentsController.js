const commentsModel = require("../models/comments");
const purchasesModel = require("../models/purchases");

exports.addComment = async (req, res) => {
  try {
    const { comment_content, comment_rate, course_id } = req.body;
    const user_id = req.user.user_id;

    if (!course_id) {
      return res
        .status(400)
        .json({ error: "Course ID is required in the request body." });
    }

    // Check if the user has purchased the course
    const hasPurchased = await purchasesModel.checkPurchase(user_id, course_id);

    if (!hasPurchased) {
      return res
        .status(403)
        .json({ error: "You haven't purchased this course." });
    }

    const purchaseInfo = await purchasesModel.getPurchaseInfo(
      user_id,
      course_id
    );
    const purchase_id = purchaseInfo.purchase_id;

    const comment = await commentsModel.addComment({
      comment_content,
      comment_rate,
      course_id,
      user_id,
      purchase_id,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error("Failed to add comment: ", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const { comment_content, comment_rate } = req.body;

    const updatedCommentId = await commentsModel.updateComment({
      comment_id,
      comment_content,
      comment_rate,
    });

    res.status(200).json({
      message: "Comment updated successfully",
      comment_id: updatedCommentId,
    });
  } catch (error) {
    console.error("Failed to update the comment: ", error);
    return res.status(500).json({ error: "Failed to update the comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment_id = req.params.comment_id;

    const deletedCommentId = await commentsModel.deleteComment(comment_id);

    res.status(200).json({
      message: "Comment soft-deleted successfully",
      comment_id: deletedCommentId,
    });
  } catch (error) {
    console.error("Failed to delete the comment: ", error);
    return res.status(500).json({ error: "Failed to delete the comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const course_id = req.params.course_id;

    const comments = await commentsModel.getComments(course_id);

    res.status(200).json({
      message: "Comments retrieved successfully",
      comments,
    });
  } catch (error) {
    console.error("Failed to retrieve comments: ", error);
    return res.status(500).json({ error: "Failed to retrieve comments" });
  }
};
