import React, { Fragment } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faUser,
    faEnvelope,
    faPhone,
    faMapMarker,
    faMapMarked
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import indexStyles from './index.module.scss';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function View({ dataPostalCode, handleValidatePostalCode, handleSubmitForm }) {
    return (
        <div className={indexStyles.generalContainerForm}>
            <h3>DIRECCIÓN DE ENVÍO</h3>
            <hr />
            <Formik
                initialValues={{
                    name: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    postalCode: '',
                    colonies: dataPostalCode ? dataPostalCode.colonies : [],
                    colony: dataPostalCode ? dataPostalCode.colonies[0] : '',
                    region: dataPostalCode ? dataPostalCode.state : '',
                    city: dataPostalCode ? dataPostalCode.city : '',
                    town: dataPostalCode ? dataPostalCode.town : '',
                    road: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string().required("Este campo es requerido"),
                        lastName: Yup.string().required("Este campo es requerido"),
                        email: Yup.string().required("Este campo es requerido"),
                        phone: Yup.string().required("Este campo es requerido"),
                        postalCode: Yup.string().required("Este campo es requerido"),
                        colony: Yup.string().required("Este campo es requerido"),
                        region: Yup.string().required("Este campo es requerido"),
                        city: Yup.string().required("Este campo es requerido"),
                        town: Yup.string().required("Este campo es requerido"),
                        road: Yup.string().required("Este campo es requerido"),
                    })
                }
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmitForm(values)
                    .then((data) => {
                        setSubmitting(false);
                        alert('Formulario enviado con exito')
                    })
                    .catch((err) => {
                        setSubmitting(false);
                        alert('Se presento un error')
                    })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                    /* and other goodies */
                }) => (
                        <form className={indexStyles.containerForm} onSubmit={handleSubmit}>
                            <div className={indexStyles.fieldsForm}>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faUser} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="name" placeholder="Nombre" className={errors.name ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm} >
                                    <FontAwesomeIcon icon={faUser} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="lastName" placeholder="Apellidos" className={errors.lastName ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faEnvelope} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="email" placeholder="Correo Electrónico" className={errors.email ? indexStyles.inputError : ''} type="email" />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faPhone} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="phone" placeholder="Número de teléfono" className={errors.phone ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarker} className={indexStyles.icons} />
                                    <input
                                        onChange={e => {
                                            setFieldValue('postalCode', e.target.value);
                                            if (e.target.value === '11000' || e.target.value === '89000') {
                                                handleValidatePostalCode(e.target.value);
                                            }
                                        }}
                                        name="postalCode"
                                        placeholder="Código postal"
                                        className={errors.postalCode ? indexStyles.inputError : ''}
                                    />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarker} className={indexStyles.icons} />
                                    {
                                        values.colonies.length > 1 ?
                                            <Fragment>
                                                <select onChange={handleChange} name="colony" placeholder="Colonia" className={errors.colony ? indexStyles.inputError : ''} >
                                                    <option value='' selected>Seleccione</option>
                                                    {
                                                        values.colonies.map((colony) => (
                                                            <option value={colony}>{colony}</option>
                                                        ))
                                                    }
                                                </select>
                                            </Fragment> :
                                            <input onChange={handleChange} name="colony" placeholder="Colonia" className={errors.colony ? indexStyles.inputError : ''} />
                                    }
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarker} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="region" placeholder="Estado/Región" className={errors.region ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarker} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="city" placeholder="Ciudad" className={errors.city ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarker} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="town" placeholder="Delegación o municipio" className={errors.town ? indexStyles.inputError : ''} />
                                </div>
                                <div className={indexStyles.fieldForm}>
                                    <FontAwesomeIcon icon={faMapMarked} className={indexStyles.icons} />
                                    <input onChange={handleChange} name="road" placeholder="Calle" className={errors.road ? indexStyles.inputError : ''} />
                                </div>
                                {
                                    Object.keys(errors).length > 0 &&
                                    <small className={indexStyles.errorMessage}>
                                        Llene los campos obligatorios
                                    </small>
                                }
                                <div className={indexStyles.buttons}>
                                    <button className={indexStyles.btnPrimaryColor}>Libreta de direcciones</button>
                                    <button className={indexStyles.btnPrimaryColor} type="submit">Guardar</button>
                                </div>
                                <div className={indexStyles.checkBox}>
                                    <input type="checkbox" />  <span class="checkmark">Utilizar como dirección de facturación.</span>
                                </div>
                            </div>
                        </form>
                    )}
            </Formik>
        </div>
    )
}

View.propTypes  = {
    dataPostalCode: PropTypes.shape(),
    handleValidatePostalCode: PropTypes.func,
    handleSubmitForm: PropTypes.func
}
