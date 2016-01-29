import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation, {colors} from '../WidgetForm/widgetValidation';
import * as widgetActions from 'redux/modules/widgets';

@connect(
  state => ({
    saveError: state.widgets.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'widget',
  fields: ['id', 'color', 'sprocketCount', 'owner'],
  validate: widgetValidation
})
export default class StaticModal extends Component {


  render() {

    return (
      <div className="content">  
      <a href="" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger" data-modal="#modal">
        Launch Modal
      </a>

      <div id="modal" className="modal modal__bg">
        <div className="modal__dialog">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__title">
                <h2 className="modal__title-text">Modal</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button  material-icons  modal__close"></span>
            </div>


            <div className="modal__text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis laboriosam accusantium facere suscipit, alias accusamus corrupti consequatur at porro, voluptates commodi sed omnis voluptatem, ex officiis illum, architecto fugiat id?
              </p>
            </div>

            <div className="modal__footer">
              <a className="mdl-button mdl-button--colored mdl-js-button  modal__close">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
