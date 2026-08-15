import Document from "../models/Document.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// =====================================================
// GET ALL DOCUMENTS
// Public
// =====================================================

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
    console.error("Get documents error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE DOCUMENT
// Public
// =====================================================

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
    console.error("Get document error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CREATE DOCUMENT
// Protected
// =====================================================

export const createDocument = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      issuer,
      date,
    } = req.body;

    console.log("========== CREATE DOCUMENT ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("=====================================");

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (!title || !type) {
      return res.status(400).json({
        success: false,
        message: "Title and type are required",
      });
    }

    // =================================================
    // ALLOWED TYPES
    // =================================================

    const allowedTypes = [
      "certificate",
      "achievement",
      "other",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type",
      });
    }

    let url = "";
    let publicId = "";
    let fileType = "";

    // =================================================
    // FILE UPLOAD
    // =================================================

    if (req.file) {
      const isPdf =
        req.file.mimetype === "application/pdf" ||
        req.file.originalname
          .toLowerCase()
          .endsWith(".pdf");

      const isImage =
        req.file.mimetype.startsWith("image/");

      if (!isPdf && !isImage) {
        return res.status(400).json({
          success: false,
          message:
            "Only PDF and image files are allowed",
        });
      }

      // IMPORTANT:
      // PDF  -> raw
      // Image -> image

      const resourceType = isPdf
        ? "raw"
        : "image";

      const result = await uploadToCloudinary(
        req.file.buffer,
        "portfolio/documents",
        resourceType
      );

      url = result.secure_url;
      publicId = result.public_id;

      fileType = isPdf
        ? "pdf"
        : "image";

      console.log("Uploaded document:");
      console.log("URL:", url);
      console.log("PUBLIC ID:", publicId);
      console.log("RESOURCE TYPE:", resourceType);
      console.log("FILE TYPE:", fileType);
    }

    // =================================================
    // CREATE DATABASE DOCUMENT
    // =================================================

    const document = await Document.create({
      title,
      type,
      description: description || "",
      issuer: issuer || "",
      date: date || "",
      url,
      publicId,
      fileType,
    });

    // =================================================
    // RESPONSE
    // =================================================

    res.status(201).json({
      success: true,
      message: "Document created successfully",
      document,
    });
  } catch (error) {
    console.error(
      "Create document error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DOWNLOAD DOCUMENT
// Public
// =====================================================

export const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.url) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // =================================================
    // IMAGE
    // =================================================

    if (document.fileType === "image") {
      return res.redirect(document.url);
    }

    // =================================================
    // PDF
    // =================================================

    if (document.fileType === "pdf") {
      const downloadUrl = document.url.replace(
        "/upload/",
        `/upload/fl_attachment:${encodeURIComponent(
          document.title || "certificate"
        )}/`
      );

      console.log(
        "PDF download URL:",
        downloadUrl
      );

      return res.redirect(downloadUrl);
    }

    // =================================================
    // FALLBACK
    // =================================================

    return res.redirect(document.url);
  } catch (error) {
    console.error(
      "Download document error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE DOCUMENT
// Protected
// =====================================================

export const updateDocument = async (
  req,
  res
) => {
  try {
    const document =
      await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // =================================================
    // UPDATE TITLE
    // =================================================

    if (req.body.title !== undefined) {
      document.title = req.body.title;
    }

    // =================================================
    // UPDATE TYPE
    // =================================================

    if (req.body.type !== undefined) {
      const allowedTypes = [
        "certificate",
        "achievement",
        "other",
      ];

      if (
        !allowedTypes.includes(req.body.type)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid document type",
        });
      }

      document.type = req.body.type;
    }

    // =================================================
    // UPDATE DESCRIPTION
    // =================================================

    if (req.body.description !== undefined) {
      document.description =
        req.body.description;
    }

    // =================================================
    // UPDATE ISSUER
    // =================================================

    if (req.body.issuer !== undefined) {
      document.issuer = req.body.issuer;
    }

    // =================================================
    // UPDATE DATE
    // =================================================

    if (req.body.date !== undefined) {
      document.date = req.body.date;
    }

    // =================================================
    // REPLACE FILE
    // =================================================

    if (req.file) {
      const isPdf =
        req.file.mimetype ===
          "application/pdf" ||
        req.file.originalname
          .toLowerCase()
          .endsWith(".pdf");

      const isImage =
        req.file.mimetype.startsWith(
          "image/"
        );

      if (!isPdf && !isImage) {
        return res.status(400).json({
          success: false,
          message:
            "Only PDF and image files are allowed",
        });
      }

      // IMPORTANT:
      // PDF  -> raw
      // Image -> image

      const resourceType = isPdf
        ? "raw"
        : "image";

      const result =
        await uploadToCloudinary(
          req.file.buffer,
          "portfolio/documents",
          resourceType
        );

      document.url =
        result.secure_url;

      document.publicId =
        result.public_id;

      document.fileType =
        isPdf ? "pdf" : "image";

      console.log(
        "Updated document file:"
      );

      console.log(
        "URL:",
        document.url
      );

      console.log(
        "PUBLIC ID:",
        document.publicId
      );

      console.log(
        "RESOURCE TYPE:",
        resourceType
      );

      console.log(
        "FILE TYPE:",
        document.fileType
      );
    }

    // =================================================
    // SAVE
    // =================================================

    await document.save();

    // =================================================
    // RESPONSE
    // =================================================

    res.status(200).json({
      success: true,
      message: req.file
        ? "Document updated and file replaced successfully"
        : "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error(
      "Update document error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE DOCUMENT
// Protected
// =====================================================

export const deleteDocument = async (
  req,
  res
) => {
  try {
    const document =
      await Document.findById(
        req.params.id
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await Document.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete document error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};