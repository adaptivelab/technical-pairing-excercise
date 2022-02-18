import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './styles.module.scss'

const durationOptions = [
  { value: 6, label: '6 months' },
  { value: 12, label: '12 months' },
  { value: 24, label: '24 months' },
];

const PaymentCalculator = () => {
  const [monthlyPayments, setMonthlyPayments] = useState('-');
  const [amount, setAmount] = useState(600);
  const [duration, setDuration] = useState(12);

  useEffect(() => {

    axios.post('/api/calculate', {
      amount,
      duration
    })
      .then(response => {
        const {payments} = response.data
        setMonthlyPayments(payments);
      })
    
  }, [amount, duration]);

  return (
    <section>
      <form>
        <div>
          <label>
            <h4>How much you're borrowing</h4>
            &pound;<input
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div>
          <p>Your repayment term</p>
          {durationOptions.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                value={option.value}
                onChange={(e) => {setDuration(Number(e.target.value))}}
                checked={duration === option.value}
                name="duration"
              />
              {option.label}
            </label>  
          ))}
        </div>

        <div>
          <h4>Your monthly repayments:</h4>
          <p>&pound;<span>{monthlyPayments}</span></p>
          <p>
            interest-free repayments
          </p>
        </div>
      </form>
    </section>
  );
};

export default PaymentCalculator;
