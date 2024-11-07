const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

router.get('/', contactsController.getAll);
router.post('/', contactsController.insert);
router.get('/:contact_id/', contactsController.get);
router.put('/:contact_id/', contactsController.update);
router.delete('/:contact_id', contactsController.delete);
module.exports = router;
