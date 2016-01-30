import React, {Component, PropTypes} from 'react';

export default class ModalTrigger extends Component {
  
  static propTypes = {
    label: PropTypes.string.isRequired,
    opener: PropTypes.func.isRequired,
    triggered: PropTypes.bool
  }
  

  constructor(props) {
    super(props);
    //this.state = {triggered: true};
    // this.close = this.close.bind(this);
    console.log('ModalTrigger ctor');
    console.log(props);
    this.state = {triggered: props.triggered};
  }

  componentWillReceiveProps = (props) => {
    console.log("Old props ")
    console.log(this.props);
    console.log("New props ")
    console.log(props);    
    if (props.triggered === true && this.props.triggered === false) {
      this.setState({opening: true, closing: false});
    } else if (props.triggered === false && this.props.triggered === true) {
      console.log('set closing');
      this.setState({opening: false, closing: true});
    } else {
      this.setState({opening: false, closing: false});
    }
  }
  
  componentDidUpdate = () => {
    console.log('componnetDidUpdate');
    console.log(this._temp);
  }


  render = () => {
    
    const {label, opener, triggered} = this.props;
    const onClickWrapper = (event) => {
      event.preventDefault();
      this.setState({triggered: true});

    };
    console.log(this.props);
    console.log(this.state);
    
    return  (triggered ? 
      
      <a href="" ref={(t) => this._trigger = t} onClick={opener} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal_trigger">
        {label}
        {triggered && <div ref={(t) => this._temp = t}></div>}
      </a>
      :
      <a href="" ref={(t) => this._trigger = t} onClick={opener} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal_trigger">
        {label}
      </a>
    );
  }
}
