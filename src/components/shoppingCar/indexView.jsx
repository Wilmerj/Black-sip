import React from 'react';
import PropTypes from "prop-types";

import { formatNumber } from "../../utils/number";

import indexStyles from "./index.module.scss";

export default function View({ listArts, loading, error }) {

    if(loading) {
        return 'Cargando...'
    }

    let totalSell = 0;
    
    listArts.forEach((product) => {
        totalSell += product.price;
    })

    return (
        <div className={indexStyles.generalContainerShopCar}>
            <div className={indexStyles.headerShopCar}>
                <h3>
                    RESUMEN DE LA ORDEN
                </h3>
            </div>
            <div className={indexStyles.bodyShopCar}>
                {
                    error &&
                    <div className={indexStyles.containerError}>
                        Se presento un error al obtener tu compra
                    </div>
                }
                {
                    listArts.forEach((art) => (
                        <div className={indexStyles.fieldProduct} key={`art_${art.name}`}>
                            <img src={art.image} />
                            <span className={indexStyles.description}>{art.name}</span>
                            <span className={indexStyles.value}>${formatNumber(art.price)}</span>
                        </div>
                    ))
                }
            </div>
            <div className={indexStyles.footerShopCar}>
                <div className={indexStyles.totals}>
                    SUBTOTAL: <span>${formatNumber(totalSell)}</span>
                </div>
                <div className={indexStyles.totals}>
                    ENVÍO:   <span>A calcular</span>
                    </div>
            </div>
                <button className={indexStyles.btnPrimaryColor} id={indexStyles.btnTotal}>
                    TOTAL <span>${formatNumber(totalSell)}</span>
                    </button>
        </div>
    )
}


View.propTypes = {
    listArts: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
}
