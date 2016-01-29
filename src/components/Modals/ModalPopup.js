import React, {Component, PropTypes} from 'react';

export default class ModalPopup extends Component {
  
    static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    closer: PropTypes.func
  }


  render = () => {
    
    const {title, show, closer} = this.props;
    console.log("show " + show);
    
    const styles = require('./Modals.scss');

    return (
      ! show ? <noscript></noscript> 
      :
      <div id="modal" className="modal modal__bg" onClick={closer} ref={(d) => this._modal = d}>
        <div className="modal__dialog">
          <div className="modal__content" ref={(d) => this._content = d}>
            <div className="modal__header">
              <div className="modal__title">
                <h2 className="modal__title-text">{title}</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button  material-icons modal_close" onClick={closer}></span>
            </div>


            {this.props.children}

            <div className="modal__footer">
              <a className="mdl-button mdl-button--colored mdl-js-button modal_close" onClick={closer}>
                Close
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
