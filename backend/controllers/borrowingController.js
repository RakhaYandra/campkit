const Borrowing = require('../models/borrowing');

exports.createBorrowing = async (req, res) => {
  const { product_id, quantity, borrow_date, return_date } = req.body;
  const user_id = req.user.id;
  try {
    const newBorrowing = await Borrowing.create(user_id, product_id, quantity, borrow_date, return_date);
    res.status(201).json(newBorrowing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating borrowing', error });
  }
};

exports.getUserBorrowings = async (req, res) => {
  const user_id = req.user.id;
  try {
    const borrowings = await Borrowing.getByUserId(user_id);
    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrowings', error });
  }
};
