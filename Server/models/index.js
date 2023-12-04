const db = require("../db/db");
const usersModel = require("./users");
const rolesModel = require("./roles");
const trainersModel = require("./trainers");
const courseCategoriesModel = require("./course_categories");
const coursesModel = require("./courses");
const course_sectionsModel = require("./course_sections");
const section_videosModel = require("./section_videos");
const commentsModel = require("./comments");
const cartModel = require("./cart");
const purchasesModel = require("./purchases");
const liveSessionsModel = require("./liveSessions");

const initializationFunctions = [
  rolesModel.createRolesTable,
  usersModel.createUsersTable,
  trainersModel.createTrainersTable,
  courseCategoriesModel.createCategoryTable,
  coursesModel.createCoursesTable,
  course_sectionsModel.createCourseSectionsTable,
  section_videosModel.createSectionVideosTable,
  commentsModel.createCommentsTable,
  cartModel.createCartTable,
  purchasesModel.createPurchasesTable,
  liveSessionsModel.createLiveSessionsTable,
];

const initializeModels = async () => {
  // Execute each initialization function
  for (const initFunction of initializationFunctions) {
    await initFunction();
  }

  console.log("Tables initialized successfully");
};

module.exports = {
  db,
  users: usersModel,
  roles: rolesModel,
  trainers: trainersModel,
  course_categories: courseCategoriesModel,
  courses: coursesModel,
  course_sections: course_sectionsModel,
  section_videos: section_videosModel,
  comments: commentsModel,
  cart: cartModel,
  purchases: purchasesModel,
  liveSession: liveSessionsModel,
  initializeModels,
};