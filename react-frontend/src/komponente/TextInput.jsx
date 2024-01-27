import React from 'react';

const TextInput = ({ type, id, label, placeholder, name, onInput }) => {
  return (
    <div className="form-outline mb-4">
      <input
        type={type}
        id={id}
        className="form-control form-control-lg"
        placeholder={placeholder}
        name={name}
        onInput={onInput}
      />
    </div>
  );
};

export default TextInput;
