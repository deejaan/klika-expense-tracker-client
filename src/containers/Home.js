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
  const [errorLoading, setErrorLoading] = useState(false);
  const [expensesArrayCopy, setExpensesArrayCopy] = useState([]);

  const handleSearchChange = e => {
    let newExpensesList = [];
    if (e.target.value !== '') {
      newExpensesList = expensesArrayCopy.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newExpensesList = expensesArrayCopy;
    }
    setExpensesArray(newExpensesList);
  };

  const getExpenses = async () => {
    setLoading(true);
    try {
      const data = await expenses();
      setExpensesArray(data);
      setLoading(false);
      setErrorLoading(false);
      setExpensesArrayCopy(data);
    } catch (error) {
      setErrorLoading(true);
      setLoading(false);
    }
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
  const toggleDropDown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getExpenses();
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
      toggleDropDown={toggleDropDown}
      expensesArray={expensesArray}
      errorLoading={errorLoading}
      getExpenses={getExpenses}
      handleSearchChange={handleSearchChange}
    ></ExpenseList>
  );
};

Home.propTypes = {};

export default Home;
