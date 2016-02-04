import React, {Component, PropTypes} from 'react';

export default class ModalTrigger extends Component {

  static propTypes = {
    triggerLabel: PropTypes.string.isRequired,
    opener: PropTypes.func.isRequired,
    triggered: PropTypes.bool
  }

  render = () => {
    const {triggerLabel, opener, triggered, ...other} = this.props;

    return (
      <a href="" {...other} onClick={opener} ref={(trigger) => this._trigger = trigger} 
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal_trigger">
        {triggerLabel}
        {triggered && <div ref={(temp) => this._temp = temp}></div>}
      </a>
    );
  }
}
