const Contact = require("../models/Contact");

// @route POST /api/contact
// @desc  Public: submit the contact form
async function submitContact(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({ contact });
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0]?.message || "Invalid submission";
      return res.status(400).json({ message: firstError });
    }
    return res.status(500).json({ message: "Failed to submit message", error: err.message });
  }
}

// @route GET /api/admin/contacts
// @desc  Admin: paginated list of contact submissions, newest first
async function adminListContacts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

    const [contacts, total, newCount] = await Promise.all([
      Contact.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
    ]);

    return res.status(200).json({
      contacts,
      page,
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
      newContacts: newCount,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load contact messages", error: err.message });
  }
}

// @route PUT /api/admin/contacts/:id
// @desc  Admin: update a contact submission's status (e.g. mark as read)
async function updateContactStatus(req, res) {
  try {
    const { status } = req.body;
    if (!["new", "read"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'new' or 'read'" });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ message: "Message not found" });

    return res.status(200).json({ contact });
  } catch (err) {
    return res.status(400).json({ message: "Invalid message id" });
  }
}

// @route DELETE /api/admin/contacts/:id
// @desc  Admin: delete a contact submission
async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });
    return res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid message id" });
  }
}

module.exports = { submitContact, adminListContacts, updateContactStatus, deleteContact };
