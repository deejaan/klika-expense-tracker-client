import React from 'react';
import '../assets/scss/ExpenseList.scss';
import Expense from '../components/Expense';
import Loader from './Loader';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { filterOptions } from '../constants';

const ExpenseList = ({
  loading,
  showDeletePopup,
  setShowDeletePopup,
  expenseId,
  deleteLoading,
  triggerExpenseDelete,
  deleteExpenseById,
  expensesArray,
  errorLoading,
  getExpenses,
  triggerFilterExpenses,
  handleSearchChange,
}) => {
  if (loading) {
    return <Loader className='loader'></Loader>;
  }
  if (errorLoading) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Error loading expenses. Please try again.</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className='btn-primary'
            onClick={() => {
              getExpenses();
            }}
          >
            Try again
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
  return (
    <div>
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
      <Modal show={showDeletePopup}>
        <Modal.Header>
          <Modal.Title>Delete expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this expense?</p>
        </Modal.Body>

        <Modal.Footer>
          {deleteLoading ? (
            <Loader></Loader>
          ) : (
            <button
              className='btn-danger'
              onClick={async () => {
                await deleteExpenseById(expenseId);
              }}
            >
              Delete
            </button>
          )}
          <button
            className='btn-primary'
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <table className='table text-center table-striped table-hover table-dark Table'>
        <thead className='thead-light'>
          <tr>
            <th colSpan='1'>Expenses</th>
            <th colSpan='1'>
              <Select
                placeholder='Filter by'
                options={filterOptions} // set list of the data
                onChange={triggerFilterExpenses} // assign onChange function
              />
            </th>
            <th colSpan='4'>
              <input
                placeholder='Search..'
                className='pl-1'
                onChange={handleSearchChange}
              ></input>
            </th>
          </tr>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Description</th>
            <th scope='col'>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expensesArray.map(item => (
            <Expense
              key={item.id}
              id={item.id}
              date={item.createdAt.slice(0, 10)}
              name={item.name}
              categoryName={item.category.name}
              description={item.description}
              amount={item.amount}
              triggerExpenseDelete={triggerExpenseDelete}
            ></Expense>
          ))}
        </tbody>
      </table>
      {expensesArray.length === 0 && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>List empty</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have no expenses.</p>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </div>
  );
};

ExpenseList.propTypes = {
  dropdownOpen: PropTypes.bool,
  loading: PropTypes.bool,
  showDeletePopup: PropTypes.bool,
  setShowDeletePopup: PropTypes.func,
  expenseId: PropTypes.number,
  deleteLoading: PropTypes.bool,
  triggerExpenseDelete: PropTypes.func,
  deleteExpenseById: PropTypes.func,
  toggleDropDown: PropTypes.func,
  expensesArray: PropTypes.array,
  getExpenses: PropTypes.func,
  errorLoading: PropTypes.bool,
  triggerFilterExpenses: PropTypes.func,
  handleSearchChange: PropTypes.func,
};
export default ExpenseList;
