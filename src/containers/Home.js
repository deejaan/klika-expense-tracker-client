import React, { useState, useEffect, useRef } from 'react';
import ExpenseList from '../components/ExpenseList';
import { notify } from '../util/helper';
import { expenses, deleteExpense, addExpense } from '../services/data.service';
import SimpleStats from '../components/SimpleStats';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { expenseFieldsValidateOk } from '../validations/addExpenseValidation';
import { categories } from '../constants';
import AddExpense from '../components/AddExpense';

const Home = () => {
  const form = useRef();

  const [expensesArray, setExpensesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [expenseId, setExpenseId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({
    name: '',
    amount: '',
    description: '',
    category: '',
  });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  //const [date, setDate] = useState();
  const [biggestExpense, setBiggestExpense] = useState();
  const [biggestExpenseAmount, setBiggestExpenseAmount] = useState();
  const [totalSpent, setTotalSpent] = useState(0);
  const [addLoading, setAddLoading] = useState(false);

  const addNewExpense = async () => {
    form.current.validateAll();
    if (expenseFieldsValidateOk()) {
      // const newDate = new Date(date);
      // const dateSliced =
      //   newDate.getFullYear() +
      //   '-' +
      //   (newDate.getMonth() + 1) +
      //   '-' +
      //   newDate.getDate() +
      //   ' 00:00:00.000000';
      setAddLoading(true);
      addExpense(
        expenseDetails.name,
        expenseDetails.amount,
        expenseDetails.description,
        expenseDetails.category
      )
        .then(response => {
          notify(response.data.message, 'success');
          getExpenses();
          setAddLoading(false);
          setShowAddExpenseModal(false);
          setAllFieldsEmpty();
        })
        .catch(error => {
          setAddLoading(false);
          setShowAddExpenseModal(false);
          notify(error.message, 'error');
          setAllFieldsEmpty();
        });
    }
  };

  const setAllFieldsEmpty = () => {
    setExpenseDetails({
      name: '',
      amount: '',
      description: '',
      category: '',
    });
  };

  const onChangeExpenseName = e => {
    const name = e.target.value;
    setExpenseDetails({ ...expenseDetails, name });
  };
  const onChangeExpenseAmount = e => {
    const amount = e.target.value;
    setExpenseDetails({ ...expenseDetails, amount });
  };
  const onChangeExpenseDescription = e => {
    const description = e.target.value;
    setExpenseDetails({ ...expenseDetails, description });
  };
  const onChangeExpenseCategory = e => {
    const category = e.value;
    setExpenseDetails({ ...expenseDetails, category });
  };
  // const onChangeDate = date => {
  //   setDate(date);
  // };
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

  const deleteExpenseById = async id => {
    const newList = expensesArray.filter(item => item.id !== id);
    const newListCopy = expensesArrayCopy.filter(item => item.id !== id);
    setDeleteLoading(true);
    deleteExpense(id)
      .then(response => {
        notify(response.data, 'success');
        setDeleteLoading(false);
        setExpensesArray(newList);
        setExpensesArrayCopy(newListCopy);
        setShowDeletePopup(false);
      })
      .catch(error => {
        notify(error.message, 'error');
        setDeleteLoading(false);
        setShowDeletePopup(false);
      });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div>
      {showAddExpenseModal && (
        <AddExpense
          expenseDetails={expenseDetails}
          showAddExpenseModal={showAddExpenseModal}
          setShowAddExpenseModal={setShowAddExpenseModal}
          categories={categories}
          addNewExpense={addNewExpense}
          onChangeExpenseAmount={onChangeExpenseAmount}
          onChangeExpenseCategory={onChangeExpenseCategory}
          onChangeExpenseDescription={onChangeExpenseDescription}
          onChangeExpenseName={onChangeExpenseName}
          form={form}
          addLoading={addLoading}
          setAllFieldsEmpty={setAllFieldsEmpty}
        ></AddExpense>
      )}
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <ExpenseList
        loading={loading}
        showDeletePopup={showDeletePopup}
        setShowDeletePopup={setShowDeletePopup}
        expenseId={expenseId}
        deleteLoading={deleteLoading}
        triggerExpenseDelete={triggerExpenseDelete}
        deleteExpenseById={deleteExpenseById}
        expensesArray={expensesArray}
        errorLoading={errorLoading}
        getExpenses={getExpenses}
        expenseDetails={expenseDetails}
        showAddExpenseModal={showAddExpenseModal}
        setShowAddExpenseModal={setShowAddExpenseModal}
        categories={categories}
        addNewExpense={addNewExpense}
        onChangeExpenseAmount={onChangeExpenseAmount}
        onChangeExpenseCategory={onChangeExpenseCategory}
        onChangeExpenseDescription={onChangeExpenseDescription}
        onChangeExpenseName={onChangeExpenseName}
        form={form}
        sortExpenses={sortExpenses}
        sortVariations={sortVariations}
        handleSearchChange={handleSearchChange}
        triggerFilterExpenses={triggerFilterExpenses}
        addLoading={addLoading}
        setAllFieldsEmpty={setAllFieldsEmpty}
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
