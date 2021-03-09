const router = require("express").Router();
const { createRecord, getRecords } = require("../controllers/dateRecords");

router.post("/api/create", createRecord);
router.get("/api/records", getRecords);

module.exports = router;