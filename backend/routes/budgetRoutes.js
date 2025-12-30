const express = require('express');
const router = express.Router();
const BudgetController = require('../controllers/budgetController');
const validate = require('../middleware/validate');
const { auth, authorize } = require('../middleware/auth');

// Validation schemas
const createBudgetSchema = {
  name: { required: true, type: 'string', minLength: 3, maxLength: 120 },
  description: { required: false, type: 'string' },
  planned_amount: { required: true, type: 'number', min: 0 },
  start_date: { required: true, type: 'string', date: true },
  end_date: { required: true, type: 'string', date: true },
  is_active: { required: false, type: 'number', enum: [0, 1] }
};

const updateBudgetSchema = {
  name: { required: true, type: 'string', minLength: 3, maxLength: 120 },
  description: { required: false, type: 'string' },
  planned_amount: { required: true, type: 'number', min: 0 },
  start_date: { required: true, type: 'string', date: true },
  end_date: { required: true, type: 'string', date: true },
  is_active: { required: false, type: 'number', enum: [0, 1] }
};

const idSchema = {
  id: { required: true, type: 'number', min: 1 }
};

// All routes require authentication
router.use(auth);

// Routes
router.get('/', BudgetController.getAll);
router.get('/:id', validate(idSchema), BudgetController.getById);
// Admin-only actions
router.post('/', authorize('admin'), validate(createBudgetSchema), BudgetController.create);
router.put('/:id', authorize('admin'), validate({ ...idSchema, ...updateBudgetSchema }), BudgetController.update);
router.delete('/:id', authorize('admin'), validate(idSchema), BudgetController.delete);

module.exports = router;
