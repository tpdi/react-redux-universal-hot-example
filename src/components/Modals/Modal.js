import React, {Component, PropTypes} from 'react';
import {ModalTrigger, ModalPopup } from 'components';

export default class Modal extends Component {

  static propTypes = {
    triggerLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  }

  static defaultProps = {
    zIndex: 1000
  }

  constructor(props) {
    super(props);
    this.state = {triggered: false};
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.triggered === false && this.state.triggered === true) {
      this.moveTrigger(this._trigger._trigger, this._trigger._temp, this._popup._modal, this._popup._content);
    } else if (prevState.triggered === true && this.state.triggered === false) {
      this.animateClose(this._trigger._trigger, this._trigger._temp, this._popup._modal, this._popup._content);
    }
  }

  close = (event) => {
    console.log('close');
    if (! event.isDefaultPrevented()
       && (event.target.classList.contains('modal_bg') || event.target.classList.contains('modal_close'))) {
      event.preventDefault();
      this.setState({triggered: false});
    }
  }

  open = (event) => {
    event.preventDefault();
    this.setState({triggered: true});
  }

  moveTrigger = (trig, div, modal, content) => {
    const trigProps = trig.getBoundingClientRect();
    const mProps = content.getBoundingClientRect();
    const xc = window.innerWidth / 2;
    const yc = window.innerHeight / 2;

    // these values are used for scale the temporary div to the same size as the modal
    let scaleX = mProps.width / trigProps.width;
    let scaleY = mProps.height / trigProps.height;

    scaleX = scaleX.toFixed(3); // round to 3 decimal places
    scaleY = scaleY.toFixed(3);


    // these values are used to move the button to the center of the window
    const transX = Math.round(xc - trigProps.left - trigProps.width / 2);
    let transY = Math.round(yc - trigProps.top - trigProps.height / 2);

    // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
    if (modal.classList.contains('modal--align-top')) {
      transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
    }

    div.classList.add('modal_temp');
    div.style.backgroundColor = window.getComputedStyle(trig).backgroundColor;

    // this class increases z-index value so the button goes overtop the other buttons
    trig.classList.add('modal_trigger--active');

    // translate button to center of screen
    trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
    trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';

    // expand temporary div to the same size as the modal
    div.style.backgroundColor = '#fff'; // transitions background color
    div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
    div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';

    const animateOpen = (divp, mod, contentp) => {
      function hideDiv() {
        // fadeout div so that it can't be seen when the window is resized
        divp.style.opacity = '0';
        contentp.removeEventListener('transitionend', hideDiv, false);
      }

      mod.classList.add('modal--active');
      // reveal the modal content
      contentp.classList.add('modal_content--active');

      contentp.addEventListener('transitionend', hideDiv, false);
    };

    window.setTimeout(function() {
      window.requestAnimationFrame(function() {
        animateOpen(div, modal, content);
      });
    }, 400);
  }

  animateClose = (trigger, div, modal, content) => {
    /* Remove active classes from triggers */
    trigger.style.transform = 'none';
    trigger.style.webkitTransform = 'none';
    trigger.classList.remove('modal_trigger--active');
  }

  render = () => {
    const {triggerLabel, title, zIndex, ...other} = this.props;

    return (
      <div>
        <ModalTrigger
           triggerLabel={triggerLabel}
           triggered={this.state.triggered}
           opener={this.open}
           ref={(trigger) => this._trigger = trigger}/>

        <ModalPopup
           {...other}
           title={title}
           show={this.state.triggered}
           closer={this.close}
           zIndex={zIndex}
           ref={(popup) => this._popup = popup}>

          {this.props.children}

        </ModalPopup>
      </div>
    );
  }
}

