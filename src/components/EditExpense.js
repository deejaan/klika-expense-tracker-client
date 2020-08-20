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
} from '../validations/expenseValidation';
import { required } from '../validations/registerValidation';
import Loader from '../components/Loader';

const EditExpense = ({
  expenseDetails,
  showEditExpenseModal,
  setShowEditExpenseModal,
  categories,
  editNewExpense,
  onChangeEditExpenseAmount,
  onChangeEditExpenseCategory,
  onChangeEditExpenseDescription,
  onChangeEditExpenseName,
  form,
  updateLoading,
  setAllEditFieldsEmpty,
  setAllFieldsEmpty,
}) => {
  return (
    <Modal show={showEditExpenseModal} size='sm'>
      <Modal.Header className='text-primary'>
        <Modal.Title>Edit Expense</Modal.Title>
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
                onChange={onChangeEditExpenseName}
                validations={[required, validateName]}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='amount'>Amount</label>
              <Input
                type='number'
                className='form-control'
                name='amount'
                value={expenseDetails.amount}
                onChange={onChangeEditExpenseAmount}
                validations={[required, validateAmount]}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                className='form-control'
                name='description'
                value={expenseDetails.description}
                onChange={onChangeEditExpenseDescription}
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
                onChange={onChangeEditExpenseCategory} // assign onChange function
                validations={validateCategory}
              />
              <Input
                tabIndex={-1}
                autoComplete='off'
                style={{ opacity: 0, height: 0 }}
                value={expenseDetails.category}
                onChange={onChangeEditExpenseCategory}
                validations={[required, validateCategory]}
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
                {updateLoading ? (
                  <Loader></Loader>
                ) : (
                  <button
                    className='btn-primary'
                    onClick={async e => {
                      await editNewExpense();
                      e.preventDefault();
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className='form-group'>
                <button
                  className='btn-info'
                  onClick={e => {
                    setShowEditExpenseModal(false);
                    setAllFieldsEmpty();
                    setAllEditFieldsEmpty();
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

EditExpense.propTypes = {
  expenseDetails: PropTypes.object,
  showEditExpenseModal: PropTypes.bool,
  setShowEditExpenseModal: PropTypes.func,
  categories: PropTypes.array,
  editNewExpense: PropTypes.func,
  onChangeEditExpenseAmount: PropTypes.func,
  onChangeEditExpenseCategory: PropTypes.func,
  onChangeEditExpenseDescription: PropTypes.func,
  onChangeEditExpenseName: PropTypes.func,
  form: PropTypes.elementType,
  updateLoading: PropTypes.bool,
  setAllEditFieldsEmpty: PropTypes.func,
  setAllFieldsEmpty: PropTypes.func,
};

export default EditExpense;
