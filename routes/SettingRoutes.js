const express = require('express');
const router = express.Router();
const SettingController = require('../controller/SettingController.js');

/*
 * GET
 */
router.get('/', SettingController.list);

/*
 * GET
 */
router.get('/:id', SettingController.show);

/*
 * POST
 */
router.post('/', SettingController.create);

/*
 * PUT
 */
router.put('/:id', SettingController.update);

/*
 * DELETE
 */
router.delete('/:id', SettingController.remove);

module.exports = router;
