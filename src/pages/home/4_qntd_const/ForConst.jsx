import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import style from "./ForConst.module.scss";
import ForTypesContent from "./ForConstContent";

function ForConst({ data }) {

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

    return (
        <div className={style.container}>
            <div className={style.theTitle}>
                <h2>Imóveis por Corretora</h2>
                <p>Total de imóveis por corretora</p>
            </div>
            <div className={style.content}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="title"
                            cx="50%"
                            cy="50%"
                            innerRadius={"55%"}
                            outerRadius={"100%"}
                            paddingAngle={2}
                            isAnimationActive={true}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="#1a1a1a"
                                    strokeWidth={2}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#ffffff",
                                borderRadius: 8,
                                border: "1px solid #ccc",
                                fontSize: 13,
                            }}
                            itemStyle={{ color: "#555" }}
                            formatter={(value, name) => [`${value}`, name]}
                        />

                        <Legend
                            content={<ForTypesContent style={style} />}
                            verticalAlign="bottom"
                            iconType="plainline"
                            iconSize={10}
                            wrapperStyle={{ fontSize: 13 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ForConst;