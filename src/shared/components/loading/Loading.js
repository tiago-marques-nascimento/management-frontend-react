import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './Loading.css';

class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
      const enabled = this.props.counter > 0;
      return (
      <div>
        {enabled && <div className="loading-background">
          <i className="fas fa-spinner loading-item"></i>
        </div>}
      </div>
      );
    }
}

Loading.propTypes = {
  counter: PropTypes.number
};

const mapStateToProps = state => ({ counter: state.loading.counter });
export default connect(mapStateToProps)(Loading);
