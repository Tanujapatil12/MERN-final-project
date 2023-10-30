const express = require('express');
const adminRouter = express.Router();

const { addAdmin, adminLogin, getAdmins } = require('../controllers/admin-controller');


adminRouter.post('/signup', addAdmin);
adminRouter.post('/login', adminLogin);
adminRouter.get('/', getAdmins);
adminRouter.post('/:id', getAdminByID);

module.exports = adminRouter