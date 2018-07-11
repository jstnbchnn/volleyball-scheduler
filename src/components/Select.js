import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const Select = ({ name, onChange, options, value, disabled, label }) => (
  <label htmlFor={name}>
    {label}
    <WrappedSelect
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
    />
  </label>
);

const WrappedSelect = styled(ReactSelect)`
  margin-top: 5px;
  margin-bottom: 15px;
  width: 350px;
`;

export default Select;
