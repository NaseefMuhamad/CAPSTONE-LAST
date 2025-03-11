import React, { useState } from 'react';

function JoinForm({ clubName }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request to join ${clubName} sent with email: ${email}`);
    setEmail('');
  };

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit" className="btn">
        Join {clubName} Club
      </button>
    </form>
  );
}

export default JoinForm;