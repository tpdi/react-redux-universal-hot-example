import React, {Component, PropTypes} from 'react';

export default class ModalTrigger extends Component {
  
  static propTypes = {
    label: PropTypes.string.isRequired,
    opener: PropTypes.func.isRequired,
    triggered: PropTypes.bool
  }
  

  



  render() {
    
    const {label, opener, triggered} = this.props;
    const onClickWrapper = (event) => {
      event.preventDefault();
      this.setState({triggered: true});

    };

    return  (triggered ? 
      
      <a href="" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
        {label}
        <div className='modal__temp' >
        </div>
      </a>
      :
      <a href="" onClick={opener} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
        {label}
      </a>
    );
  }
}
