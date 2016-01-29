import React, {Component, PropTypes} from 'react';


export default class BodyModal extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    buttonText: PropTypes.string,
  }
  
  render() {
    
    const { id, title, buttonText } = this.props;
    const hashId = '#' + id;

    return (
      <div className="content">  
      <a href="" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger" data-modal={hashId}>
      {buttonText}
      </a>

      <div id={id} className="modal modal__bg">
        <div className="modal__dialog">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__title">
                <h2 className="modal__title-text">{title}</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button  material-icons  modal__close"></span>
            </div>


            { this.props.children}

            <div className="modal__footer">
              <a className="mdl-button mdl-button--colored mdl-js-button  modal__close">
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
