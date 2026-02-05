import Task from "../models/task.model.js";
import ErrorResponse from "../utils/errorResponse.js";

// ---------------- CREATE TASK ----------------
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- GET ALL TASKS (BY USER) ----------------
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort("-createdAt")
      .lean();

    return res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- GET SINGLE TASK ----------------
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    // Prevent reading someone else’s task
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    return res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- UPDATE TASK ----------------
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    // Ownership check
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    // Perform update
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: "Task updated",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- DELETE TASK ----------------
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorResponse("Task not found", 404));
    }

    // Ownership check
    if (task.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Not authorized", 403));
    }

    await Task.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};
