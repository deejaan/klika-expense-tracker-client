import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
const Expense = ({
  id,
  date,
  name,
  categoryName,
  description,
  amount,
  triggerExpenseDelete,
}) => {
  return (
    <tr>
      <td className='column1'>{date}</td>
      <td className='column2'>{name}</td>
      <td className='column3'>{categoryName}</td>
      <td className='column4'>{description}</td>
      <td className='column6'>{amount}</td>
      <td>
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
};

export default Expense;
