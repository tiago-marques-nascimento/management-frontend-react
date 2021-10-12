import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { CLOSE_CONFIRMATION } from '../../constants/ActionTypes';
import './Confirmation.css';

class Confirmation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          opened: false,
        };

        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleYes() {
      this.props.confirmationHandler();
      this.props.dispatchHandleClose();
    }

    handleNo() {
      this.props.cancellationHandler();
      this.props.dispatchHandleClose();
    }

    render() {
      const visible = this.props.opened;
      return (
        <div>
          {visible && <div className="confirmation-background">
              <div className="confirmation-dialog">
                  <div className="confirmation-title">Do you confirm this action?</div>
                  <div className="confirmation-options">
                      <button className="confirmation-option-yes" onClick={this.handleYes}>Yes</button>
                      <button className="confirmation-option-no" onClick={this.handleNo}>No</button>
                  </div>
              </div>
          </div>}
        </div>
      );
    }
}

const mapStateToProps = state => ({
  opened: state.confirmation.opened,
  confirmationHandler: state.confirmation.confirmationHandler,
  cancellationHandler: state.confirmation.cancellationHandler,
});
const mapDispatchToProps = dispatch => ({
  dispatchHandleClose: () => {
      dispatch({
        type: CLOSE_CONFIRMATION
      });
  },
})

Confirmation.propTypes = {
  confirmationHandler: PropTypes.func,
  dispatchHandleClose: PropTypes.func,
  cancellationHandler: PropTypes.func,
  opened: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
