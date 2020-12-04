import React, { useEffect, useState } from 'react';
import { ServiceFactory } from '../../controllers/ServiceFactory';
import { getRequest } from '../../controllers/ServiceInteractor';

import View from "./indexView";

export default function Index() {
    const [ listArts, setListArts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        const { serverUrl, routes } = ServiceFactory;
        const url = `${serverUrl}${routes.products}`;

        getRequest(url)
        .then((data) => {
            setListArts(data)
            console.info(data)
        })
        .catch((err) => {
            console.info(err)
        })
    }
    return (
        <View 
            listArts={listArts}
            loading={loading}
            error={error}
        />
    )
}
