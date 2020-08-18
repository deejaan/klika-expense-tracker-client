import React from 'react';
import PropTypes from 'prop-types';

const SimpleStats = ({ totalSpent, biggestExpense, biggestExpenseAmount }) => {
  return (
    <div className='card text-center w-25 card1 mb-5'>
      <div className='card-body'>
        <h4 className='card-title'>Simple statistics</h4>
        <p className='card-text'>Total spent: {totalSpent} </p>
        <p className='card-text'>
          Biggest expense: {biggestExpense + ' ' + biggestExpenseAmount}{' '}
        </p>
      </div>
    </div>
  );
};

SimpleStats.propTypes = {
  totalSpent: PropTypes.number,
  biggestExpense: PropTypes.string,
  biggestExpenseAmount: PropTypes.number,
};

export default SimpleStats;
