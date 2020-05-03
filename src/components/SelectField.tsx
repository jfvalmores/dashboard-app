import React, { useState, useRef } from 'react';
import SelectFieldProps from '../interfaces/SelectFieldProps';

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  value,
  options,
  children,
  disabled,
  handleChange,
}) => {
  const [val, setVal] = useState<string | null>(value);
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <select
        id={id}
        ref={selectRef}
        onChange={handleChange}
      >
        {options && options.map((option, i) => (
          <option
            key={i}
            value={option.data}
          >
            {option.label}
          </option>
        ))

        }
      </select>
    </div>
  )
}

export default SelectField;