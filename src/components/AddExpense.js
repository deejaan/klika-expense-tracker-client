import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
  validateName,
  validateAmount,
  validateCategory,
} from '../validations/addExpenseValidation';
import Loader from './Loader';

const AddExpense = ({
  expenseDetails,
  showAddExpenseModal,
  setShowAddExpenseModal,
  categories,
  addNewExpense,
  onChangeExpenseAmount,
  onChangeExpenseCategory,
  onChangeExpenseDescription,
  onChangeExpenseName,
  form,
  addLoading,
  setAllFieldsEmpty,
}) => {
  return (
    <Modal show={showAddExpenseModal} size='sm'>
      <Modal.Header className='text-primary'>
        <Modal.Title>Create Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={form}>
          <div>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <Input
                type='text'
                className='form-control'
                name='expensename'
                value={expenseDetails.name}
                onChange={onChangeExpenseName}
                validations={[validateName]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='amount'>Amount</label>
              <Input
                type='number'
                className='form-control'
                name='amount'
                value={expenseDetails.amount}
                onChange={onChangeExpenseAmount}
                validations={[validateAmount]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                className='form-control'
                name='description'
                value={expenseDetails.description}
                onChange={onChangeExpenseDescription}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='category'>Category</label>
              <Select
                placeholder='Select category'
                value={categories.find(
                  obj => obj.value === expenseDetails.category
                )} // set selected value
                options={categories} // set list of the data
                onChange={onChangeExpenseCategory} // assign onChange function
                validations={validateCategory}
              />
              <Input
                tabIndex={-1}
                autoComplete='off'
                style={{ opacity: 0, height: 0 }}
                value={expenseDetails.category}
                onChange={onChangeExpenseCategory}
                validations={[validateCategory]}
              />
            </div>
            {/* <div className='form-group'>
              <label htmlFor='date'>Date</label>
              <br></br>
              <DatePicker
                selected={date}
                onChange={onChangeDate}
                dateFormat='yyyy-MM-dd'
              />
            </div> */}
            <Modal.Footer>
              <div className='form-group'>
                {addLoading ? (
                  <Loader></Loader>
                ) : (
                  <button
                    className='btn btn-primary'
                    onClick={e => {
                      addNewExpense();
                      e.preventDefault();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <div className='form-group'>
                <button
                  className='btn btn-info'
                  onClick={e => {
                    setShowAddExpenseModal(false);
                    setAllFieldsEmpty();
                    e.preventDefault();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddExpense.propTypes = {
  expenseDetails: PropTypes.object,
  showAddExpenseModal: PropTypes.bool,
  setShowAddExpenseModal: PropTypes.func,
  categories: PropTypes.array,
  addNewExpense: PropTypes.func,
  onChangeExpenseAmount: PropTypes.func,
  onChangeExpenseCategory: PropTypes.func,
  onChangeExpenseDescription: PropTypes.func,
  onChangeExpenseName: PropTypes.func,
  form: PropTypes.elementType,
  addLoading: PropTypes.bool,
  setAllFieldsEmpty: PropTypes.func,
};

export default AddExpense;
