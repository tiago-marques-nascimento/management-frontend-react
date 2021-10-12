import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

class Checkbox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleSelect(index) {
      if (this.props.value) {
        if (!this.props.disabled) {
          if (!this.props.multipleSelection) {
            for (let n = 0; n < this.props.value.length; n++) {
              this.props.value[n] = false;
            }
          }
          this.props.value[index] = true;
          if(this.props.changeHandler) {
            this.props.changeHandler();
          }
        }
        this.forceUpdate();
      }
    }
  
    handleDeselect(index) {
      if (this.props.value) {
        if (!this.props.disabled) {
          this.props.value[index] = false;
          if(this.props.changeHandler) {
            this.props.changeHandler();
          }
        }
        this.forceUpdate();
      }
    }

    render() {

      const singleSelection = (!this.props.multipleSelection && this.props.value && this.props.value.length > 0) ?? false;
      const multipleSelection = (this.props.multipleSelection && this.props.value && this.props.value.length > 0) ?? false;
      const value = this.props.value ?? [];
      const options = this.props.options ?? [];
      return (
        <div>
          {multipleSelection && <div className="checkbox">
            {options.map((option, i) => {
              return <span key={i}>
                {value[i] && <a onClick={this.handleDeselect.bind(this, i)}><i className="fas fa-check-square"></i></a>}
                {!value[i] && <a onClick={this.handleSelect.bind(this, i)}><i className="far fa-square"></i></a>}
                {option.label && <span>{option.label}</span>}
                {option.image && <span><img src={option.image}/></span>}
              </span>
            })}
          </div>}
          {singleSelection && <div className="checkbox">
            {options.map((option, i) => {
              return <span key={i}>
                {value[i] && <a><i className="fas fa-dot-circle"></i></a>}
                {!value[i] && <a onClick={this.handleSelect.bind(this, i)}><i className="far fa-circle"></i></a>}
                {option.label && <span> {option.label} </span>}
                {option.image && <span> <img src={option.image}/> </span>}
              </span>
            })}
          </div>}
        </div>
      );
    }
}

Checkbox.propTypes = {
  changeHandler: PropTypes.func,
  multipleSelection: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  options: PropTypes.array
};

export default Checkbox;
