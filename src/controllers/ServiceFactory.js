const ServiceFactory = {
    serverUrl: 'https://blackisp.herokuapp.com', //Esto por lo general va en variables de entorno,
    routes: {
        products: '/products',
        postalCodes: '/postalCodes',
        contact: '/contact'
    }
}

export {
    ServiceFactory
}