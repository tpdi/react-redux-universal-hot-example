import React, {Component, PropTypes} from 'react';
import {Modal, ModalCloseButton } from 'components';

export default class ModalWithCloseButtonFooter extends Component {

  static propTypes = {
    triggerLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeButtonLabel: PropTypes.string,
    zIndex: PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  }

  static defaultProps = {
    zIndex: 1000
  }

  render = () => {
    const {triggerLabel, title, closeButtonLabel, zIndex} = this.props;

    return (
      <Modal
        triggerLabel={triggerLabel}
        title={title}
        zIndex={zIndex}>

        {this.props.children}

        <div
          className="modal_footer">

          <ModalCloseButton
            label={closeButtonLabel}/>

        </div>

      </Modal>
    );
  }
}

