import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation, {colors} from './WidgetForm/widgetValidation';
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
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStop, fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Widgets/Widgets.scss');
    return (
      <div class="content">  
      <a href="" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger" data-modal="#modal">
        Launch Modal
      </a>

      <div id="modal" class="modal modal__bg">
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <div class="modal__title">
                <h2 class="modal__title-text">Modal</h2>
              </div>

              <span class="mdl-button mdl-button--icon mdl-js-button  material-icons  modal__close"></span>
            </div>


            <div class="modal__text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis laboriosam accusantium facere suscipit, alias accusamus corrupti consequatur at porro, voluptates commodi sed omnis voluptatem, ex officiis illum, architecto fugiat id?
              </p>
            </div>

            <div class="modal__footer">
              <a class="mdl-button mdl-button--colored mdl-js-button  modal__close">
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
