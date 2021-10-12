import React from 'react';
import './Unauthorized.css';

class Unauthorized extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
      return (
        <div>
          <div className="line">
            <div className="row" style={{width:'100'}}>
              {"You don't have authorization to view this page"}
            </div>
          </div>
        </div>
      );
    }
}

export default Unauthorized;
