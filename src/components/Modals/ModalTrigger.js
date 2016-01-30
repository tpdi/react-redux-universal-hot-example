import React, {Component, PropTypes} from 'react';

export default class ModalTrigger extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    opener: PropTypes.func.isRequired,
    triggered: PropTypes.bool
  }

  render = () => {
    const {label, opener, triggered} = this.props;

    return (
      <a href="" ref={(trigger) => this._trigger = trigger} onClick={opener}
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal_trigger">
        {label}
        {triggered && <div ref={(temp) => this._temp = temp}></div>}
      </a>
    );
  }
}
