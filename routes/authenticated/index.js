const express = require("express");
const router = express.Router();
//Routes
const authRoutes = require("./auth.routes");
const tagRoutes = require("./tag.routes");
const categoryRoutes = require("./category.routes");
const aboutRoutes = require("./about.routes");
const userRoutes = require("./user.routes");
const actorRoutes = require("./actor.routes");
const termConditionRoutes = require("./termCondition.routes");
// const bannerRoutes = require("./banner.routes");
const bannerRoutes = require("./banner1.routes");
const faqsRoutes = require("./faqs.routes");
const slidesRoutes = require("./slide.routes");
const adsRoutes = require("./ads.routes");

router.use("/auth", authRoutes);
router.use("/tag", tagRoutes);
router.use("/category", categoryRoutes);
router.use("/about", aboutRoutes);
router.use("/termAndCondition", termConditionRoutes);
// router.use("/banner", bannerRoutes);
router.use("/banner", bannerRoutes);
router.use("/faqs", faqsRoutes);
router.use("/slide", slidesRoutes);
router.use("/ads", adsRoutes);

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/actor", actorRoutes);

module.exports = router;
