import React, {Component, PropTypes} from 'react';

export default class ModalPopup extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    closer: PropTypes.func.isRequired,
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
    const {title, show, closer, zIndex, ...other} = this.props;
    const zIndexStyle = {
      zIndex: zIndex + " !important"
    }
    return (
      ! show ? <noscript></noscript>
      :
      <div id="modal" className="modal modal_bg" style={zIndexStyle} onClick={closer} ref={(modal) => this._modal = modal}>
        <div className="modal_dialog" {...other}>
          <div className="modal_content" ref={(content) => this._content = content}>
            <div className="modal_header">
              <div className="modal_title">
                <h2 className="modal_title-text">{title}</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button material-icons modal_close"></span>
            </div>


            {this.props.children}


          </div>
        </div>
      </div>

    );
  }
}
