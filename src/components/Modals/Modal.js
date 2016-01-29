import React, {Component, PropTypes} from 'react';
import {ModalTrigger, ModalPopup } from 'components';

export default class Modal extends Component {

  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,

  }

  constructor(props) {
    super(props);
    this.state = {triggered: true};
    // this.close = this.close.bind(this);
  }

  close = (event) => {
    event.preventDefault();
    // event.stopImmediatePropagation();
    console.log('closing');
    this.setState({triggered: false});
  }

  open = (event) => {
    event.preventDefault();
    // event.stopImmediatePropagation();
    console.log('opening');
    this.setState({triggered: true});
  }

  render() {
    const {label, title} = this.props;
    // console.log(this.state.triggered);
    return (
      <div>
        <ModalTrigger label={label} triggered={this.state.triggered} opener={this.open}/>
        <ModalPopup title={title} show={this.state.triggered} closer={this.close}>
          {this.props.children}
        </ModalPopup>
      </div>

    );
  }
}
