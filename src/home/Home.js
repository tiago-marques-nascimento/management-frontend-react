import React from 'react';
import './Home.css';
import {
  Link,
} from "react-router-dom";

class Home extends React.Component {

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
            <div className="row" style={{width:'100%'}}>
              Home
            </div>
          </div>
          <div className="line">
            <div id='home-label' className="row" style={{width:'100%'}}>
              {"There's not much to do here except to go to the "}<Link to="/user">user management</Link>{" page..."}
            </div>
          </div>
        </div>
      );
    }
}

export default Home;
