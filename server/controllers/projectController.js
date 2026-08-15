import Project from "../models/Project.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// ==========================================
// GET ALL PROJECTS
// ==========================================

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

// ==========================================
// GET SINGLE PROJECT
// ==========================================

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

// ==========================================
// CREATE PROJECT
// ==========================================

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

    // ==========================================
    // CONVERT TECHNOLOGIES INTO ARRAY
    // ==========================================

    let parsedTechnologies = [];

    if (technologies) {
      try {
        parsedTechnologies = Array.isArray(technologies)
          ? technologies
          : JSON.parse(technologies);
      } catch (error) {
        parsedTechnologies = technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    // ==========================================
    // MEDIA ARRAYS
    // ==========================================

    const images = [];
    const videos = [];

    // ==========================================
    // UPLOAD MEDIA
    // ==========================================

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

    // ==========================================
    // CREATE PROJECT
    // ==========================================

    const project = await Project.create({
      title,
      description,
      technologies: parsedTechnologies,
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
    console.error("Create project error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE PROJECT
// ==========================================

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
      deleteImages,
    } = req.body;

    // ==========================================
    // UPDATE BASIC FIELDS
    // ==========================================

    if (title !== undefined) {
      project.title = title;
    }

    if (description !== undefined) {
      project.description = description;
    }

    // ==========================================
    // UPDATE TECHNOLOGIES
    // ==========================================

    if (technologies !== undefined) {
      let parsedTechnologies = [];

      try {
        parsedTechnologies = Array.isArray(technologies)
          ? technologies
          : JSON.parse(technologies);
      } catch (error) {
        parsedTechnologies = technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      project.technologies = parsedTechnologies;
    }

    // ==========================================
    // UPDATE URLS
    // ==========================================

    if (githubUrl !== undefined) {
      project.githubUrl = githubUrl;
    }

    if (liveUrl !== undefined) {
      project.liveUrl = liveUrl;
    }

    if (featured !== undefined) {
      project.featured = featured;
    }

    // ==========================================
    // DELETE SELECTED IMAGES
    // ==========================================

    if (deleteImages !== undefined) {
      let imagesToDelete = [];

      try {
        imagesToDelete = Array.isArray(deleteImages)
          ? deleteImages
          : JSON.parse(deleteImages);
      } catch (error) {
        imagesToDelete = [];
      }

      if (Array.isArray(imagesToDelete)) {
        project.images = project.images.filter(
          (image) => !imagesToDelete.includes(image)
        );
      }
    }

    // ==========================================
    // UPLOAD NEW MEDIA
    // ==========================================

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

      // Add new images
      project.images.push(...newImages);

      // Add new videos
      project.videos.push(...newVideos);
    }

    // ==========================================
    // SAVE PROJECT
    // ==========================================

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE PROJECT
// ==========================================

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(
      req.params.id
    );

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
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};