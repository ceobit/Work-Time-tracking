const router = require("express").Router();

const { createRecord, getRecords, deleteRecord, updateRecord } = require("../controllers/dateRecords");

router.post("/api/create", createRecord);
router.get("/api/records", getRecords);
router.delete('/api/delete/:recordId', deleteRecord);
router.patch('/api/patch/:recordId', updateRecord);

module.exports = router;