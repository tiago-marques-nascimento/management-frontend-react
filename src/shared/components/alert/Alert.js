import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './Alert.css';
import { REMOVE_ALERT } from '../../constants/ActionTypes';

const ALERT_TIMEOUT = 3000;

export const ALERT_SUCCESS = 1;
export const ALERT_WARNING = 2;
export const ALERT_ERROR = 3;

class Alert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          alerts: [],
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(previousProps) {
      const component = this;
      this.props.alerts
        .filter(alert => !previousProps.alerts || !previousProps.alerts.includes(alert))
        .forEach(alert => {
          setTimeout(() => {
            component.props.dispatchTriggerAlertRemoval(alert);
          }, ALERT_TIMEOUT);
        });
    }

    componentWillUnmount() {
    }

    render() {
      const alerts = this.props.alerts ?? [];
      return (
        <div className="alert">
          {alerts.map((alert, i) => (
            <div key={i}>
              <div className={(alert.type === ALERT_SUCCESS) ? 'alert-success' : (alert.type === ALERT_WARNING) ? 'alert-warning' : 'alert-error'}>
                {(alert.type === ALERT_SUCCESS) ? 'Success: ' : (alert.type === ALERT_WARNING) ? 'Warning: ' : 'Error: '}
                {alert.message}
              </div>
            </div>
          ))}
        </div>
      );
    }
}

Alert.propTypes = {
  dispatchTriggerAlertRemoval: PropTypes.func.isRequired,
  alerts: PropTypes.array
};

const mapStateToProps = state => ({ alerts: state.alert.alerts });
const mapDispatchToProps = dispatch => ({
  dispatchTriggerAlertRemoval: (alert) => {
    dispatch({
      type: REMOVE_ALERT,
      alert
    });
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
