import React, {Component, PropTypes} from 'react';
import {ModalTrigger, ModalPopup } from 'components';

export default class Modal extends Component {

  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,

  }

  constructor(props) {
    super(props);
    this.state = {triggered: false};
    // this.close = this.close.bind(this);
  }

  close = (event) => {
    event.preventDefault();
    // event.stopImmediatePropagation();
    // console.log('closing');
    // console.log('trigger', this._trigger);
    // console.log('popup', this._popup);
    this.setState({triggered: false});
  }

  open = (event) => {
    event.preventDefault();
    // event.stopImmediatePropagation();
    // console.log('opening');
    // console.log('trigger', this._trigger);
    // console.log('popup', this._popup);
    this.setState({triggered: true});
  }
  

  
  moveTrigger = (trig, div, modal, content) => {
    var trigProps = trig.getBoundingClientRect();
    var m = modal;
    var mProps = content.getBoundingClientRect();
    var transX, transY, scaleX, scaleY;
    var xc = window.innerWidth / 2;
    var yc = window.innerHeight / 2;

    // this class increases z-index value so the button goes overtop the other buttons
    trig.classList.add('modal__trigger--active');

    // these values are used for scale the temporary div to the same size as the modal
    scaleX = mProps.width / trigProps.width;
    scaleY = mProps.height / trigProps.height;

    scaleX = scaleX.toFixed(3); // round to 3 decimal places
    scaleY = scaleY.toFixed(3);


    // these values are used to move the button to the center of the window
    transX = Math.round(xc - trigProps.left - trigProps.width / 2);
    transY = Math.round(yc - trigProps.top - trigProps.height / 2);

    // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
    if (m.classList.contains('modal--align-top')) {
      transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
    }


    // translate button to center of screen
    trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
    trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';

    // expand temporary div to the same size as the modal
    div.style.backgroundColor = '#fff'; // transitions background color
    div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
    div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';

    var animateOpen = (div, m, content) => {

    function hideDiv() {
      // fadeout div so that it can't be seen when the window is resized
      div.style.opacity = '0';
      content.removeEventListener('transitionend', hideDiv, false);
    }

    // if (!isOpen) {
      // select the content inside the modal
      // var content = m.querySelector('.modal__content');
      // reveal the modal
      m.classList.add('modal--active');
      // reveal the modal content
      content.classList.add('modal__content--active');

      content.addEventListener('transitionend', hideDiv, false);

      // isOpen = true;
    //}
  }

    window.setTimeout(function() {
      window.requestAnimationFrame(function() {
        animateOpen(div, m, content);
      });
    }, 400);

  }
  
  componentDidUpdate = (prevProps, prevState) => {
    console.log('Modal componnetDidUpdate');
    console.log('prevProps', prevProps, this.props);
    console.log('prevState', prevState, this.state);
    console.log('trigger', this._trigger);
    console.log('popup', this._popup);
    if (prevState.triggered === false && this.state.triggered === true) {
      this.moveTrigger(this._trigger._trigger, this._trigger._temp, this._popup._modal, this._popup._content);
    }
  }

  render = () => {
    const {label, title} = this.props;
    // console.log(this.state.triggered);
    return (
      <div>
        <ModalTrigger label={label} triggered={this.state.triggered} opener={this.open} ref={(t) => this._trigger = t}/>
        <ModalPopup title={title} show={this.state.triggered} closer={this.close} ref={(p) => this._popup = p}>
          {this.props.children}
        </ModalPopup>
      </div>

    );
  }
}
