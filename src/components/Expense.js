import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
const Expense = ({
  id,
  date,
  name,
  categoryName,
  description,
  amount,
  triggerExpenseDelete,
  triggerExpenseEdit,
  setExpenseDetails,
  categoryId,
}) => {
  return (
    <tr>
      <td className='column1'>{date}</td>
      <td className='column2'>{name}</td>
      <td className='column3'>{categoryName}</td>
      <td className='column4'>{description}</td>
      <td className='column6'>{amount}</td>
      <td style={{ width: '8%' }}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => {
            setExpenseDetails({
              name: name,
              amount: amount,
              description: description,
              category: categoryId,
            });
            triggerExpenseEdit(id);
          }}
          style={{ cursor: 'pointer' }}
          className='mr-4'
        />

        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            triggerExpenseDelete(id);
          }}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
};

Expense.propTypes = {
  date: PropTypes.string,
  name: PropTypes.string,
  categoryName: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  id: PropTypes.number,
  triggerExpenseDelete: PropTypes.func,
  triggerExpenseEdit: PropTypes.func,
  setExpenseDetails: PropTypes.func,
  categoryId: PropTypes.number,
};

export default Expense;
