import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import { notify } from '../util/helper';
import { expenses, deleteExpense } from '../services/data.service';
import SimpleStats from '../components/SimpleStats';

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expensesArray, setExpensesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [biggestExpense, setBiggestExpense] = useState();
  const [biggestExpenseAmount, setBiggestExpenseAmount] = useState();
  const [totalSpent, setTotalSpent] = useState(0);
  const [sortVariations, setSortVariations] = useState([
    { sortBy: 'createdAt', sortType: 'none' },
    { sortBy: 'name', sortType: 'none' },
    { sortBy: 'category', sortType: 'none' },
    { sortBy: 'description', sortType: 'none' },
    { sortBy: 'amount', sortType: 'none' },
  ]);
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
      //code for initializing variables for simple stats
      if (data.length !== 0) {
        let biggest = data[0];
        data.forEach(element => {
          if (element.amount > biggest.amount) {
            biggest = element;
          }
          setTotalSpent(g => g + element.amount);
        });
        setBiggestExpense(biggest.name);
        setBiggestExpenseAmount(biggest.amount);
      }
      setErrorLoading(false);
      setExpensesArrayCopy(data);
    } catch (error) {
      setErrorLoading(true);
      setLoading(false);
    }
  };

  const setSortVariation = sortBy => {
    let variations = sortVariations;
    variations.forEach(variation => {
      if (variation.sortBy === sortBy) {
        if (variation.sortType === 'none') {
          variation.sortType = 'ascending';
        } else if (variation.sortType === 'ascending') {
          variation.sortType = 'descending';
        } else if (variation.sortType === 'descending') {
          variation.sortType = 'ascending';
        }
      } else {
        variation.sortType = 'none';
      }
    });
    setSortVariations(variations);
  };

  const sortExpenses = sortBy => {
    setSortVariation(sortBy);
    let variation = sortVariations.find(item => item.sortBy === sortBy);
    let sortedExpenses = [...expensesArray];

    sortedExpenses.sort((a, b) => {
      let itemA, itemB;
      if (variation.sortBy === 'category') {
        itemA = a[variation.sortBy].name.toLowerCase();
        itemB = b[variation.sortBy].name.toLowerCase();
      } else if (variation.sortBy === 'amount') {
        itemA = a[variation.sortBy];
        itemB = b[variation.sortBy];
      } else {
        if (a[variation.sortBy] === null) {
          itemA = '';
        } else {
          itemA = a[variation.sortBy].toLowerCase();
        }
        if (b[variation.sortBy] === null) {
          itemB = '';
        } else {
          itemB = b[variation.sortBy].toLowerCase();
        }
      }
      if (variation.sortType === 'ascending') {
        if (itemA < itemB) {
          return -1;
        }
        if (itemA > itemB) {
          return 1;
        }
        return 0;
      } else {
        if (itemA < itemB) {
          return 1;
        }
        if (itemA > itemB) {
          return -1;
        }
        return 0;
      }
    });
    setExpensesArray(sortedExpenses);
  };
  const triggerFilterExpenses = e => {
    let newExpensesList = [];
    if (e.value !== 0) {
      newExpensesList = expensesArrayCopy.filter(item => {
        return item.category.id === e.value;
      });
    } else {
      newExpensesList = expensesArrayCopy;
    }
    setExpensesArray(newExpensesList);
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
    <div>
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
        sortExpenses={sortExpenses}
        sortVariations={sortVariations}
        handleSearchChange={handleSearchChange}
        triggerFilterExpenses={triggerFilterExpenses}
      ></ExpenseList>
      {biggestExpense !== undefined && totalSpent !== undefined && (
        <SimpleStats
          className='mx-auto'
          biggestExpense={biggestExpense}
          totalSpent={totalSpent}
          biggestExpenseAmount={biggestExpenseAmount}
        ></SimpleStats>
      )}
    </div>
  );
};
Home.propTypes = {};

export default Home;
