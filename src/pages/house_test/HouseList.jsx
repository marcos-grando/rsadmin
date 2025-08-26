import React from "react";
import style from './HouseList.module.scss';

function HouseList() {

    // Abaixo, em datalist, devo apenas colocar como "name" a variável das cores sendo testadas;
    // com o 'ii', fará a numeração das variáveis (--name-1, --name-2, etc);
    const datalist = [
        // { name: "test1" },
        // { name: "test2" },
        { name: "primary" },
        { name: "terciary" },
        { name: "atrative" },
        { name: "secondary" }
    ]

    return (
        <section className={style.sectMain}>
            {datalist.map((item, i) => (
                <div key={i} className={style.content}>

                    <p>{item.name}</p>

                    {Array.from({ length: 5 }).map((_, ii) => (
                        <div className={style.test} style={{ backgroundColor: `var(--${item.name}-${ii + 1})` }}></div>
                    ))}

                </div>
            ))}
        </section>
    )
}

export default HouseList;