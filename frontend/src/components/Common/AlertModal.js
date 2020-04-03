import React from 'react';

const AlertModal = (props) => {
    return (
        <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title">{props.text}</h6>
                        <button type="button" className="close" onClick={() => props.setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => props.setShowModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AlertModal;

