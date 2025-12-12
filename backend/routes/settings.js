const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const auth = require("./auth");

const usersFile = path.join(__dirname, "../data/users.json");

// Helper: Read users
function readUsers() {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

// Helper: Save users
function writeUsers(data) {
    fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
}

// --------------------------------------------------
// GET ALL USERS (admin only)
// --------------------------------------------------
router.get("/users", auth.adminOnly, (req, res) => {
    const users = readUsers().map(u => ({
        username: u.username,
        role: u.role
    }));

    res.json(users);
});

// --------------------------------------------------
// ADD STAFF ACCOUNT (admin only)
// --------------------------------------------------
router.post("/add-staff", auth.adminOnly, (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const users = readUsers();
    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newStaff = {
        username,
        password,
        role: "staff"
    };

    users.push(newStaff);
    writeUsers(users);

    res.json({ message: "Staff account created", user: newStaff });
});

// --------------------------------------------------
// DELETE STAFF (admin only)
// --------------------------------------------------
router.delete("/remove-staff/:username", auth.adminOnly, (req, res) => {
    const username = req.params.username;

    if (username === "admin") {
        return res.status(400).json({ message: "Cannot delete main admin" });
    }

    const users = readUsers();
    const updated = users.filter(u => u.username !== username);

    if (updated.length === users.length) {
        return res.status(404).json({ message: "Staff not found" });
    }

    writeUsers(updated);

    res.json({ message: "Staff removed successfully" });
});

// --------------------------------------------------
// CHANGE ADMIN PASSWORD
// --------------------------------------------------
router.post("/change-password", auth.adminOnly, (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: "New password required" });
    }

    const users = readUsers();
    const admin = users.find(u => u.role === "admin");

    admin.password = newPassword;
    writeUsers(users);

    res.json({ message: "Password updated successfully" });
});

module.exports = router;
