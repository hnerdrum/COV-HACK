import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const NewListingModal = ({db}) => {
    const [showModal, setShowModal] = useState(false);

    const buttonClicked = () => {
        setShowModal(!showModal);
    }

    const getValues = () => {
        let valuegroup = {
            company_name: document.getElementById("company-name").value || "",
            address: document.getElementById("address")?.value || "",
            material: document.getElementById("material")?.value || "",
            materialgrade: document.getElementById("material-grade")?.value || "",
            weight: document.getElementById("tonnage")?.value || "",
            description: document.getElementById("description")?.value || "",
        }
        valuegroup.title = [valuegroup.material, valuegroup.materialgrade]
        return valuegroup;
      };

    const addListingToFirebase = async () => {
        var response = db.collection("scrapmetal").add(getValues());
        response.then((e) => {
            setShowModal(!showModal)
        })
    };


    return (
        <div className="new-listing-btn">
            <Button type="button"
                    className="btn btn-lg new-listing"
                    onClick={() => buttonClicked()}
            >
                New listing
            </Button>
            { showModal ? (
                <div className="modal" id="exampleModal" tabIndex="-1" role="dialog">
                <div className="new-listing-modal" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Create new listing</h5>
                      <button type="button" className="close" onClick={() => setShowModal()}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Company name</label>
                          <input type="text" className="form-control" id="company-name"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Address</label>
                          <input type="text" className="form-control" id="address"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Material</label>
                          <input type="text" className="form-control" id="material"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Grade</label>
                          <input type="text" className="form-control" id="material-grade"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Tonnage</label>
                          <input type="text" className="form-control" id="tonnage"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Description</label>
                          <textarea rows={2} type="textarea" className="form-control" id="description"/>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn new-listing" onClick={() => addListingToFirebase()}>Create</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal()}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            ): null}
        </div>
    )
}

export default NewListingModal;