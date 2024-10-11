// app/api/customers.js

const express = require('express');
const Customer = require('../../models/Customer');
const router = express.Router();

// List all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new customer
router.post('/', async (req, res) => {
  const { name, dateOfBirth, memberNumber, interests } = req.body;
  try {
    const newCustomer = new Customer({ name, dateOfBirth, memberNumber, interests });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing customer
router.put('/:id', async (req, res) => {
  const { name, dateOfBirth, memberNumber, interests } = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name, dateOfBirth, memberNumber, interests }, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
