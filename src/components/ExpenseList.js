import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../assets/scss/ExpenseList.scss';
import Expense from '../components/Expense';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const ExpenseList = ({
  dropdownOpen,
  loading,
  showDeletePopup,
  setShowDeletePopup,
  expenseId,
  deleteLoading,
  triggerExpenseDelete,
  deleteExpenseById,
  toggle,
  expensesArray,
}) => {
  if (loading) {
    return <Loader className='loader'></Loader>;
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
              <Dropdown isOpen={dropdownOpen} toggle={toggle} size='sm'>
                <DropdownToggle caret className='btn-block'>
                  Filter by
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Cat1</DropdownItem>
                  <DropdownItem>Cat2</DropdownItem>
                  <DropdownItem>Cat3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </th>
            <th colSpan='4'>
              <input placeholder='Search..' className='pl-1'></input>
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
              categoryName={item.categoryName}
              description={item.description}
              amount={item.amount}
              triggerExpenseDelete={triggerExpenseDelete}
            ></Expense>
          ))}
        </tbody>
      </table>
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
  toggle: PropTypes.func,
  expensesArray: PropTypes.array,
};

export default ExpenseList;
