import React, {Component, PropTypes} from 'react';

export default class ModalPopup extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    closer: PropTypes.func.isRequired,
    closeLabel: PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
  }

  static defaultProps = {
    closeLabel: 'Close'
  }

  render = () => {
    const {title, show, closer, closeLabel} = this.props;

    return (
      ! show ? <noscript></noscript>
      :
      <div id="modal" className="modal modal_bg" onClick={closer} ref={(modal) => this._modal = modal}>
        <div className="modal_dialog">
          <div className="modal_content" ref={(content) => this._content = content}>
            <div className="modal_header">
              <div className="modal_title">
                <h2 className="modal_title-text">{title}</h2>
              </div>

              <span className="mdl-button mdl-button--icon mdl-js-button  material-icons modal_close" onClick={closer}></span>
            </div>


            {this.props.children}

            <div className="modal_footer">
              <a className="mdl-button mdl-button--colored mdl-js-button modal_close" onClick={closer}>
                {closeLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
