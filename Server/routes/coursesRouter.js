const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");
const verify = require("../middlewares/verify");
// post
router.post("/addCourse", verify.authorize, coursesController.addCourse);
router.post("/addCourseSection/:course_id", coursesController.addCourseSection);
router.post(
  "/addCourseVideos/:course_section_id",
  coursesController.addCourseVideo
);

//update
router.put("/updateCourse/:course_id", coursesController.updateCourse);

router.put(
  "/updateCourseSection/:course_section_id",
  coursesController.updateCourseSection
);
router.put(
  "/updateCourseVideos/:video_id",
  coursesController.updateCourseVideo
);
//delete
router.put("/deleteCourse/:course_id", coursesController.deleteCourse);
router.put(
  "/deleteCourseSection/:course_section_id",
  coursesController.deleteCourseSection
);
router.put(
  "/deleteCourseVideos/:video_id",
  coursesController.deleteCourseVideo
);

router.get("/getCourses", coursesController.getCourses);
router.get("/getCourse/:course_id", coursesController.getCourse);
router.get(
  "/getCourseSections/:course_id",
  coursesController.getCourseSections
);
router.get(
  "/getSectionVideoDetails/:video_id",
  coursesController.getSectionVideoDetails
);
router.get(
  "/getSectionVideos/:course_section_id",
  coursesController.getSectionVideos
);
router.get("/getCoursesByFilter", coursesController.getCoursesByFilter);
router.get("/getCoursesBySearch", coursesController.getCoursesBySearch);
router.get(
  "/getTrainerCourses",
  verify.authorize,
  coursesController.getTrainerCourses
);

module.exports = router;

// router.post("/addCourseObject/:course_id", coursesController.addCourseObject);
// router.post(
//   "/addCourseRequirement/:course_id",
//   coursesController.addCourseRequirement
// );

// router.put(
//   "/updateCourseObject/:object_id",
//   coursesController.updateCourseObject
// );
// router.put(
//   "/updateCourseRequirement/:requirement_id",
//   coursesController.updateCourseRequirement
// );

// router.put(
//   "/deleteCourseObject/:object_id",
//   coursesController.deleteCourseObject
// );
// router.put(
//   "/deleteCourseRequirement/:requirement_id",
//   coursesController.deleteCourseRequirement
// );

// router.get(
//   "/getCourseObjectDetails/:course_id",
//   coursesController.getCourseObjectDetails
// );
// router.get(
//   "/getCourseRequirementDetails/:course_id",
//   coursesController.getCourseRequirementDetails
// );
