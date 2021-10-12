import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './Table.css';
import { OPEN_CONFIRMATION } from '../../constants/ActionTypes'

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    triggerView(item) {
      if(this.props.viewHandler) {
        this.props.viewHandler(item);
      }
    }

    triggerEdit(item) {
      if(this.props.editHandler) {
        this.props.editHandler(item);
      }
    }

    beforeRemove(item) {
      const component = this;
      this.props.dispatchHandleRemove(
        () => {
          component.triggerRemove(item);
        },
        () => {}
      );
    }

    triggerRemove(item) {
      if(this.props.removeHandler) {
        this.props.removeHandler(item);
      }
    }

    render() {
      const columns = this.props.columns;
      const list = this.props.list;
      return (
        <div className="table">
          <div className="line table-head">
            {columns.map((column, i) => {
              const style = {width: column.length};
              return <div key={i} className="row" style={style}>
                {column.label}
              </div>
            })}
            <div className="row">Actions</div>
          </div>
          {list.map((item, i1) => {
            return <div key={`l${i1}`} className={'line ' + ((i1%2==0) ? 'table-body-highlight' : 'table-body-no-highlight')}>
              {columns.map((column, i2) => {
                const style = {width: column.length};
                return <div key={`l${i1}${i2}`} className="row" style={style}>
                  {item[column.value]}
                </div>
              })}
              <div className="row">
                <a className="table-button-view" onClick={this.triggerView.bind(this, item)}><i className="fas fa-eye"></i></a>
                <a className="table-button-edit" onClick={this.triggerEdit.bind(this, item)}><i className="fas fa-edit"></i></a>
                <a className="table-button-remove" onClick={this.beforeRemove.bind(this, item)}><i className="fas fa-trash"></i></a>
              </div>
            </div>
          })}
        </div>
      );
    }
}

Table.propTypes = {
  viewHandler: PropTypes.func,
  editHandler: PropTypes.func,
  removeHandler: PropTypes.func,
  dispatchHandleRemove: PropTypes.func,
  columns: PropTypes.array,
  list: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  dispatchHandleRemove: (confirmationHandler, cancellationHandler) => {
      dispatch({
        type: OPEN_CONFIRMATION,
        confirmationHandler,
        cancellationHandler
      });
  },
})

export default connect(() => ({}), mapDispatchToProps)(Table);
