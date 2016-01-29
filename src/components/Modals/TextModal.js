import React, {Component, PropTypes} from 'react';



export default class TextModal extends Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  }
  
  render() {
    
    const { title, text } = this.props;

    return (
      <div className="content">  
      <a href="" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger" data-modal="#textmodal">
        Launch Modal
      </a>

      <div id="textmodal" className="modal modal__bg">
        <div className="modal__dialog">
          <div className="modal__content">
            <div className="modal__header">
              <div className="modal__title">
                <h2 className="modal__title-text">{title}</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button  material-icons  modal__close"></span>
            </div>


            <div className="modal__text">
              <p>
                {text}
              </p>
            </div>

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
