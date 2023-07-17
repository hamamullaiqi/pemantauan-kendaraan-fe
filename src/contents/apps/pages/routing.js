import Chart from "./chart.js";
import Home from "./home";

export const Routing = [
    {
        to: '/home',
        level: 0x1fff,
        component: <Home/>
    },
    {
        to: '/chart',
        level: 0x1fff,
        component: <Chart/>
    },
]