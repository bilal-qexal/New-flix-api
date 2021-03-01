const express = require("express");
const router = express.Router();
//Routes
const authRoutes = require("./auth.routes");
const tagRoutes = require("./tag.routes");
const categoryRoutes = require("./category.routes");
const aboutRoutes = require("./about.routes");
const termConditionRoutes = require("./termCondition.routes");
const bannerRoutes = require("./banner.routes");
const faqsRoutes = require("./faqs.routes");
const slideRoutes = require("./slide.routes");
const adsRoutes = require("./ads.routes");
const topbarContentRoutes = require("./topbarContent.routes");
const contactFormRoutes = require("./contactForm.routes");
const blogRoutes = require("./blog.routes");

router.use("/auth", authRoutes);
router.use("/tag", tagRoutes);
router.use("/category", categoryRoutes);
router.use("/about", aboutRoutes);
router.use("/termAndCondition", termConditionRoutes);
router.use("/banner", bannerRoutes);
router.use("/faqs", faqsRoutes);
router.use("/slide", slideRoutes);
router.use("/ads", adsRoutes);
router.use("/topbarContent", topbarContentRoutes);
router.use("/contactForm", contactFormRoutes);
router.use("/blog", blogRoutes);

router.use("/profile", express.static("/uploads/images"));

module.exports = router;
