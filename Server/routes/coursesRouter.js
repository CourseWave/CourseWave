const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");
const verify = require("../middlewares/verify");

router.post("/addCourse", verify.authorize, coursesController.addCourse);
router.post("/addCourseObject/:course_id", coursesController.addCourseObject);
router.post(
  "/addCourseRequirement/:course_id",
  coursesController.addCourseRequirement
);
router.post("/addCourseSection/:course_id", coursesController.addCourseSection);
router.post(
  "/addCourseVideos/:course_section_id",
  coursesController.addCourseVideo
);

router.put("/updateCourse/:course_id", coursesController.updateCourse);
router.put(
  "/updateCourseObject/:course_object_id",
  coursesController.updateCourseObject
);
router.put(
  "/updateCourseRequirement/:course_requirement_id",
  coursesController.updateCourseRequirement
);
router.put(
  "/updateCourseSection/:course_section_id",
  coursesController.updateCourseSection
);
router.put(
  "/updateCourseVideos/:video_id",
  coursesController.updateCourseVideo
);

router.put("/deleteCourse/:course_id", coursesController.deleteCourse);
router.put(
  "/deleteCourseSection/:course_section_id",
  coursesController.deleteCourseSection
);
router.put(
  "/deleteCourseVideos/:video_id",
  coursesController.deleteCourseVideo
);

router.get(
  "/getCourse/:course_id",
  verify.authorize,
  coursesController.getCourse
);
router.get(
  "/getCourseObjectDetails/:course_id",
  coursesController.getCourseObjectDetails
);
router.get(
  "/getCourseRequirementDetails/:course_id",
  coursesController.getCourseRequirementDetails
);
router.get(
  "/courseSectionDetails/:course_id",
  coursesController.getCourseSectionDetails
);

module.exports = router;
