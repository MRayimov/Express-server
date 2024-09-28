import express from "express";
import * as commentsController from "../controllers/commentsController.js";
export const commentsRouter = express.Router();

commentsRouter
  .route("/")
  .get(commentsController.getAllComments)
  .post(commentsController.createNewComment);

commentsRouter
  .route("/:id")
  .get(commentsController.getComment)
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment);
