const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const auth = require("./auth");

const ordersFile = path.join(__dirname, "../data/orders.json");

// Helper: Read orders
function readOrders() {
    return JSON.parse(fs.readFileSync(ordersFile, "utf8"));
}

// --------------------------------------------------
// FULL DASHBOARD ANALYTICS
// --------------------------------------------------
router.get("/", auth.staffOrAdmin, (req, res) => {
    const orders = readOrders();

    // Total Orders
    const totalOrders = orders.length;

    // Completed & Pending
    const completedOrders = orders.filter(o => o.status === "completed").length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;

    // Total Revenue
    const totalRevenue = orders
        .filter(o => o.status === "completed")
        .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    // SALES BY DATE
    let salesByDate = {};
    orders.forEach(order => {
        const date = order.createdAt?.split("T")[0];
        if (!date) return;
        if (!salesByDate[date]) salesByDate[date] = 0;
        if (order.status === "completed") {
            salesByDate[date] += order.totalPrice || 0;
        }
    });

    // SALES BY MONTH
    let salesByMonth = {};
    orders.forEach(order => {
        if (!order.createdAt) return;
        const month = order.createdAt.substring(0, 7);
        if (!salesByMonth[month]) salesByMonth[month] = 0;
        if (order.status === "completed") {
            salesByMonth[month] += order.totalPrice || 0;
        }
    });

    // TOP PRODUCTS
    let productCount = {};
    orders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                if (!productCount[item]) productCount[item] = 0;
                productCount[item]++;
            });
        }
    });

    const topProducts = Object.entries(productCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    res.json({
        totalOrders,
        completedOrders,
        pendingOrders,
        totalRevenue,
        salesByDate,
        salesByMonth,
        topProducts
    });
});

module.exports = router;
