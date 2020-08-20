import React from 'react';
import '../assets/scss/ExpenseList.scss';
import Expense from '../components/Expense';
import Loader from './Loader';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-ui/core/Tooltip';
import {
  faCaretDown,
  faCaretUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
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
  triggerExpenseEdit,
  setExpenseDetails,
  setShowAddExpenseModal,
  sortExpenses,
  sortVariations,
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
            <th colSpan='3'>
              <input
                placeholder='Search..'
                className='pl-1'
                onChange={handleSearchChange}
              ></input>
            </th>
            <th colSpan='1'>
              <Tooltip title='Create Expense' placement='bottom' arrow>
                <div
                  onClick={() => {
                    setShowAddExpenseModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                  className='rounded p-1 btn-secondary'
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>
              </Tooltip>
            </th>
          </tr>
          <tr className='hover'>
            <th
              scope='col'
              onClick={() => {
                sortExpenses('createdAt');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Date{' '}
                  {sortVariations[0].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sortVariations[0].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </div>
              </Tooltip>
            </th>

            <th
              scope='col'
              onClick={() => {
                sortExpenses('name');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Name{' '}
                  {sortVariations[1].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sortVariations[1].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </div>
              </Tooltip>
            </th>

            <th
              scope='col'
              onClick={() => {
                sortExpenses('category');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Category{' '}
                  {sortVariations[2].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sortVariations[2].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </div>
              </Tooltip>
            </th>
            <th
              scope='col'
              onClick={() => {
                sortExpenses('description');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Description{' '}
                  {sortVariations[3].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sortVariations[3].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </div>
              </Tooltip>
            </th>
            <th
              scope='col'
              onClick={() => {
                sortExpenses('amount');
              }}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title='Click to sort' placement='bot'>
                <div>
                  Amount{' '}
                  {sortVariations[4].sortType === 'ascending' && (
                    <FontAwesomeIcon icon={faCaretUp} />
                  )}
                  {sortVariations[4].sortType === 'descending' && (
                    <FontAwesomeIcon icon={faCaretDown} />
                  )}
                </div>
              </Tooltip>
            </th>
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
              categoryId={item.category.id}
              description={item.description}
              amount={item.amount}
              triggerExpenseDelete={triggerExpenseDelete}
              triggerExpenseEdit={triggerExpenseEdit}
              setExpenseDetails={setExpenseDetails}
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
  loading: PropTypes.bool,
  showDeletePopup: PropTypes.bool,
  setShowDeletePopup: PropTypes.func,
  expenseId: PropTypes.number,
  deleteLoading: PropTypes.bool,
  triggerExpenseDelete: PropTypes.func,
  deleteExpenseById: PropTypes.func,
  expensesArray: PropTypes.array,
  getExpenses: PropTypes.func,
  errorLoading: PropTypes.bool,
  triggerExpenseEdit: PropTypes.func,
  setExpenseDetails: PropTypes.func,
  sortExpenses: PropTypes.func,
  sortVariations: PropTypes.array,
  triggerFilterExpenses: PropTypes.func,
  handleSearchChange: PropTypes.func,
  setShowAddExpenseModal: PropTypes.func,
};
export default ExpenseList;
