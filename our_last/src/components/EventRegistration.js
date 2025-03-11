import React, { useState } from 'react';

function EventRegistration({ event, onRegister }) {
  const [registered, setRegistered] = useState(false);

  const handleClick = () => {
    onRegister(event.id, event.title);
    setRegistered(true);
  };

  return (
    <div className="event-registration">
      <button
        className="register-button"
        onClick={handleClick}
        disabled={registered}
      >
        {registered ? 'Registered' : 'Register Now'}
      </button>
      {registered && <p className="register-success">Successfully registered!</p>}
    </div>
  );
}

export default EventRegistration;