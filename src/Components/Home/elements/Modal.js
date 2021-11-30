import React from "react";
import $ from "jquery";

const close = function () {
  $(".modalReact").hide();
};

function Modal(props) {
  if (props.show) {
    $(".modalReact").show();
  }
  return (
    <div id="myModalReact" className="modalReact">
      <div className="modal-text">
        <div className="modal-header">
          <div className="modal-title">
            <h4>{props.name}</h4>
          </div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={close}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
