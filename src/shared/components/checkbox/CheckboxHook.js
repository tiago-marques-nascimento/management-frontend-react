import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

export default function CheckboxHook(props) {

  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue([...props.value]);
  }, [props.value]);

  const handleSelect = (index) => {
    if (props.value) {
      if (!props.disabled) {
        if (!props.multipleSelection) {
          for (let n = 0; n < props.value.length; n++) {
            props.value[n] = false;
          }
        }
        props.value[index] = true;
        if(props.changeHandler) {
          props.changeHandler();
        }
      }
      setValue([...props.value]);
    }
  }

  const handleDeselect = (index) =>{
    if (props.value) {
      if (!props.disabled) {
        props.value[index] = false;
        if(props.changeHandler) {
          props.changeHandler();
        }
      }
      setValue([...props.value]);
    }
  }

  const singleSelection = (!props.multipleSelection && value && value.length > 0) ?? false;
  const multipleSelection = (props.multipleSelection && value && value.length > 0) ?? false;
  const options = props.options ?? [];
  return (
    <div>
      {multipleSelection && <div className="checkbox">
        {options.map((option, i) => {
          return <span key={i}>
            {value[i] && <a onClick={handleDeselect.bind(this, i)}><i className="fas fa-check-square"></i></a>}
            {!value[i] && <a onClick={handleSelect.bind(this, i)}><i className="far fa-square"></i></a>}
            {option.label && <span>{option.label}</span>}
            {option.image && <span><img src={option.image}/></span>}
          </span>
        })}
      </div>}
      {singleSelection && <div className="checkbox">
        {options.map((option, i) => {
          return <span key={i}>
            {value[i] && <a><i className="fas fa-dot-circle"></i></a>}
            {!value[i] && <a onClick={handleSelect.bind(this, i)}><i className="far fa-circle"></i></a>}
            {option.label && <span> {option.label} </span>}
            {option.image && <span> <img src={option.image}/> </span>}
          </span>
        })}
      </div>}
    </div>
  );
}

CheckboxHook.propTypes = {
  changeHandler: PropTypes.func,
  multipleSelection: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  options: PropTypes.array
};
