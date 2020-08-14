import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import { notify } from '../util/helper';
import { expenses, deleteExpense } from '../services/data.service';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expensesArray, setExpensesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProducts = () => {
    const fetchData = async () => {
      setLoading(true);
      const data = await expenses();
      setExpensesArray(data);
      setLoading(false);
    };
    fetchData();
  };

  const triggerExpenseDelete = id => {
    setExpenseId(id);
    setShowDeletePopup(true);
  };

  async function deleteExpenseById(id) {
    const newList = expensesArray.filter(item => item.id !== id);
    setDeleteLoading(true);
    deleteExpense(id)
      .then(response => {
        notify(response.data, 'success');
        setDeleteLoading(false);
        setExpensesArray(newList);
        setShowDeletePopup(false);
      })
      .catch(error => {
        notify(error.message, 'error');
        setDeleteLoading(false);
        setShowDeletePopup(false);
      });
  }
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ExpenseList
      dropdownOpen={dropdownOpen}
      loading={loading}
      showDeletePopup={showDeletePopup}
      setShowDeletePopup={setShowDeletePopup}
      expenseId={expenseId}
      deleteLoading={deleteLoading}
      triggerExpenseDelete={triggerExpenseDelete}
      deleteExpenseById={deleteExpenseById}
      toggle={toggle}
      expensesArray={expensesArray}
    ></ExpenseList>
  );
};

Home.propTypes = {};

export default Home;
