import React, {Component, PropTypes} from 'react';

export default class ModalCloseButton extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    label: PropTypes.string,
  }

  static defaultProps = {
    onClose: () => {},
    label: 'Close'
  }

  render = () => {
    const {onClose, label, ...other} = this.props;

    return (
      <a {...other} className="mdl-button mdl-button--colored mdl-js-button modal_close" onClick={onClose}>
        {label}
      </a>
    );
  }
}
