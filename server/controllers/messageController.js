import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

// Create message - Public
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Save message in MongoDB
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification to you
    try {
      await sendEmail({
        to: process.env.EMAIL_GET_USER,
        subject: subject
          ? `Portfolio Contact: ${subject}`
          : `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
            
            <h2>New Portfolio Contact Message</h2>

            <p>
              You received a new message through your portfolio website.
            </p>

            <hr />

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Subject:</strong> ${
                subject || "No subject"
              }
            </p>

            <h3>Message</h3>

            <p>
              ${message}
            </p>

            <hr />

            <p>
              <strong>Reply directly to:</strong> ${email}
            </p>

          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      // Message is already safely stored in MongoDB
      return res.status(201).json({
        success: true,
        message:
          "Message received, but email notification could not be sent.",
        data: newMessage,
      });
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all messages - Owner only
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single message - Owner only
export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark message as read/unread - Owner only
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete message - Owner only
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};