const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

// ------------------------------------
// TEMP USERS (replace with database later)
// ------------------------------------
const USERS = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "staff", password: "staff123", role: "staff" }
];

// Secret key for JWT
const SECRET = "PRECIOUS_SCENT_SECRET_KEY";

// ------------------------------------
// LOGIN
// ------------------------------------
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid login details" });
    }

    const token = jwt.sign(
        { role: user.role, username: user.username },
        SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("admin_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });

    res.json({ message: "Login successful", role: user.role });
});

// ------------------------------------
// CHECK LOGIN STATUS
// ------------------------------------
router.get("/status", (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) return res.json({ authenticated: false });

    try {
        const decoded = jwt.verify(token, SECRET);
        res.json({
            authenticated: true,
            role: decoded.role,
            username: decoded.username
        });
    } catch {
        res.json({ authenticated: false });
    }
});

// ------------------------------------
// LOGOUT
// ------------------------------------
router.post("/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ message: "Logged out" });
});

// ------------------------------------
// MIDDLEWARES
// ------------------------------------
function adminOnly(req, res, next) {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Not logged in" });

    try {
        const decoded = jwt.verify(token, SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied: Admin only" });
        }
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

function staffOrAdmin(req, res, next) {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Not logged in" });

    try {
        jwt.verify(token, SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

router.adminOnly = adminOnly;
router.staffOrAdmin = staffOrAdmin;

module.exports = router;
