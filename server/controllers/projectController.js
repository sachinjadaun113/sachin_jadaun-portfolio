import Project from "../models/Project.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured,
    } = req.body;

    const images = [];
    const videos = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        let resourceType = "image";

        if (file.mimetype.startsWith("video/")) {
          resourceType = "video";
        }

        const result = await uploadToCloudinary(
          file.buffer,
          "portfolio/projects",
          resourceType
        );

        if (resourceType === "video") {
          videos.push(result.secure_url);
        } else {
          images.push(result.secure_url);
        }
      }
    }

    const project = await Project.create({
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      images,
      videos,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured,
    } = req.body;

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (technologies !== undefined) {
      project.technologies = technologies;
    }

    if (githubUrl !== undefined) {
      project.githubUrl = githubUrl;
    }

    if (liveUrl !== undefined) {
      project.liveUrl = liveUrl;
    }

    if (featured !== undefined) {
      project.featured = featured;
    }

    if (req.files && req.files.length > 0) {
      const newImages = [];
      const newVideos = [];

      for (const file of req.files) {
        let resourceType = "image";

        if (file.mimetype.startsWith("video/")) {
          resourceType = "video";
        }

        const result = await uploadToCloudinary(
          file.buffer,
          "portfolio/projects",
          resourceType
        );

        if (resourceType === "video") {
          newVideos.push(result.secure_url);
        } else {
          newImages.push(result.secure_url);
        }
      }

      project.images.push(...newImages);
      project.videos.push(...newVideos);
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};