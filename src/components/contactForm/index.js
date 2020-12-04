import React, { useState } from 'react';

import { getRequest, postRequest } from "../../controllers/ServiceInteractor";
import { ServiceFactory } from "../../controllers/ServiceFactory";

import View from "./indexView";

export default function Index() {
  const [dataPostalCode, setDataPostalCode] = useState(null);
  const { serverUrl, routes } = ServiceFactory;

  function handleValidatePostalCode(postalCode) {
    const url = `${serverUrl}${routes.postalCodes}/${postalCode}`;
    getRequest(url)
      .then((data) => {
        if (Object.keys(data).length > 0) {
          setDataPostalCode(data);
        }
      })
      .catch((err) => {
        console.info(err);
      })
  }

  function handleSubmitForm(values) {
    return new Promise((resolve, reject) => {
      const url = `${serverUrl}${routes.contact}`;
      const dataBody = {
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        postalCode: values.postalCode,
        colony: values.colony,
        region: values.region,
        city: values.city,
        town: values.town,
        road: values.road
      }
      postRequest(url, dataBody)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  return (
    <View
      handleValidatePostalCode={handleValidatePostalCode}
      dataPostalCode={dataPostalCode}
      handleSubmitForm={handleSubmitForm}
    />
  )
}
