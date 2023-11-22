// PaymentPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  // Assuming you have a Redux store with courses
  const { courseId } = useParams();
  const courses = useSelector((state) => state.Courses.Courses);
  const course = courses.find((c) => c.id === parseInt(courseId));

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');

  const handlePayment = () => {
    // Add logic to handle payment processing here
    console.log('Payment processed successfully!');
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h1>Payment for {course.title}</h1>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cvc">CVC:</label>
        <input
          type="text"
          id="cvc"
          value={cvc}
          onChange={(e) => setCVC(e.target.value)}
        />
      </div>
      <button onClick={handlePayment}>Process Payment</button>
    </div>
  );
};

export default PaymentPage;
