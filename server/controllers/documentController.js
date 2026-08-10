import Document from "../models/Document.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Get all documents
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single document
export const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create document
export const createDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document file is required",
      });
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF and image files are allowed",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "portfolio/documents",
      req.file.mimetype === "application/pdf"
        ? "raw"
        : "image"
    );

    const document = await Document.create({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description || "",
      issuer: req.body.issuer || "",
      date: req.body.date || "",
      url: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update document
export const updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (req.body.title !== undefined) {
      document.title = req.body.title;
    }

    if (req.body.type !== undefined) {
      document.type = req.body.type;
    }

    if (req.body.description !== undefined) {
      document.description = req.body.description;
    }

    if (req.body.issuer !== undefined) {
      document.issuer = req.body.issuer;
    }

    if (req.body.date !== undefined) {
      document.date = req.body.date;
    }

    // Upload new file if provided
    if (req.file) {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Only PDF and image files are allowed",
        });
      }

      const resourceType =
        req.file.mimetype === "application/pdf"
          ? "raw"
          : "image";

      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/documents",
        resourceType
      );

      document.url = result.secure_url;
      document.publicId = result.public_id;
    }

    await document.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};