import React from 'react';

const LoginModal = (props) => {
  return (
    <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Enter login information</h5>
            <button type="button" className="close" onClick={() => props.setShowModal()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                <input type="text" className="form-control" id="user-id"/>
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">Password:</label>
                <input type="password" className="form-control" id="password"/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => props.setShowModal()}>Close</button>
            <button type="button" className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;
