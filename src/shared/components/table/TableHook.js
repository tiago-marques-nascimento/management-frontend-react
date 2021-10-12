import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import './Table.css';
import { OPEN_CONFIRMATION } from '../../constants/ActionTypes'

export default function TableHook(props) {

  const dispatch = useDispatch();

  const triggerView = (item) => {
    if(props.viewHandler) {
      props.viewHandler(item);
    }
  }

  const triggerEdit = (item) => {
    if(props.editHandler) {
      props.editHandler(item);
    }
  }

  const triggerRemove = (item) => {
    if(props.removeHandler) {
      props.removeHandler(item);
    }
  }

  const beforeRemove = (item) => {
    dispatch({
      type: OPEN_CONFIRMATION,
      confirmationHandler: () => {
        triggerRemove(item);
      },
      cancellationHandler: () => {}
    });
  }

  const columns = props.columns;
  const list = props.list;
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
            <a className="table-button-view" onClick={triggerView.bind(this, item)}><i className="fas fa-eye"></i></a>
            <a className="table-button-edit" onClick={triggerEdit.bind(this, item)}><i className="fas fa-edit"></i></a>
            <a className="table-button-remove" onClick={beforeRemove.bind(this, item)}><i className="fas fa-trash"></i></a>
          </div>
        </div>
      })}
    </div>
  );
}

TableHook.propTypes = {
  viewHandler: PropTypes.func,
  editHandler: PropTypes.func,
  removeHandler: PropTypes.func,
  dispatchHandleRemove: PropTypes.func,
  columns: PropTypes.array,
  list: PropTypes.array,
};