import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import './Confirmation.css';
import { CLOSE_CONFIRMATION } from '../../constants/ActionTypes'

export default function ConfirmationHook() {

    const opened = useSelector(state => state.confirmation.opened);
    const confirmationHandler = useSelector(state => state.confirmation.confirmationHandler);
    const cancellationHandler = useSelector(state => state.confirmation.cancellationHandler);

    const dispatch = useDispatch();

    const handleYes = () => {
      confirmationHandler();
      dispatch({ type: CLOSE_CONFIRMATION });
    }

    const handleNo = () => {
      cancellationHandler();
      dispatch({ type: CLOSE_CONFIRMATION });
    }

    const visible = opened;
    return (
      <div>
        {visible && <div className="confirmation-background">
            <div className="confirmation-dialog">
                <div className="confirmation-title">Do you confirm this action?</div>
                <div className="confirmation-options">
                    <button className="confirmation-option-yes" onClick={handleYes}>Yes</button>
                    <button className="confirmation-option-no" onClick={handleNo}>No</button>
                </div>
            </div>
        </div>}
      </div>
    );
}

ConfirmationHook.propTypes = {
  confirmationHandler: PropTypes.func,
  dispatchHandleClose: PropTypes.func,
  cancellationHandler: PropTypes.func,
  opened: PropTypes.bool
};
