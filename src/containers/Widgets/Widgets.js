import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as widgetActions from 'redux/modules/widgets';
import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';
import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import { WidgetForm } from 'components';
import { StaticModal, TextModal, BodyModal, WidgetModal, Modal } from 'components';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadWidgets());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    widgets: state.widgets.data,
    editing: state.widgets.editing,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  {...widgetActions, initializeWithKey })
export default class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  render() {
    const handleEdit = (widget) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(widget.id));
    };
    const {widgets, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Widgets.scss');
    const modalStyle = require('../../components/Modals/Modals.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <StaticModal/>
        <hr/>
        <TextModal title="I am a TextModal" text="Hello Kiho, this is a modal with title and text as properties"/>
        <hr/>
        <BodyModal id="kihobodymodal" title="My Modal Title" buttonText="Show Material-Modal Modal">
            <div className="modal__text">
              <p>
                Hello Kiho, this is a modal with an in-line body and a title as a property
              </p>
            </div>
        </BodyModal>
        <hr/>
        <Modal label="Show Pure React Modal" title="Hello Kiho, I am Pure React" closeLabel="Cancel">
          <div className="modal_text">
            <p>Hello I am Pure React modal for Kiho. Please close me.</p>
          </div>
        </Modal>

        <h1>
          Widgets
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Widgets
          </button>
        </h1>
        <Helmet title="Widgets"/>
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the static method <code>fetchDataDeferred</code>. To block a route transition until some data is loaded, use <code>fetchData</code>.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This widgets are stored in your session, so feel free to edit it and refresh.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {widgets && widgets.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            widgets.map((widget) => editing[widget.id] ?
              <WidgetForm formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> :
              <tr key={widget.id}>
                <td className={styles.idCol}>{widget.id}</td>
                <td className={styles.colorCol}>{widget.color}</td>
                <td className={styles.sprocketsCol}>{widget.sprocketCount}</td>
                <td className={styles.ownerCol}>{widget.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(widget)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
                <td className={styles.buttonCol}>
                  <BodyModal id={'w' + widget.id} title={'Widget Id ' + widget.id} buttonText="Show Modal">
                                      <button className="btn btn-primary" onClick={handleEdit(widget)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                  </BodyModal>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

