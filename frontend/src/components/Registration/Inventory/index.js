import React from 'react';
import styles from "./Inventory.module.css";
import {FieldArray} from "redux-form";
import InventoryField from "../InventoryField";

const Inventory = () => {

    return (
        <div className={styles.container}>
            <h2>Inventory</h2>
            <FieldArray name="equipment"
                   component={InventoryField}
            />
        </div>
    );
};

export default Inventory;