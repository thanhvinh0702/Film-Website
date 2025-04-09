import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"
import { userData } from "../../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react"
import axios from "axios"

export default function Home() {
    const MONTHS = useMemo(() => [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Agu', 'Sep',
        'Oct', 'Nov', 'Dec'
    ], []);

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get("/api/users/stats", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                const statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                })
                setUserStats(prev => []);
                statsList.map((item) => setUserStats(prev => [...prev, { name: MONTHS[item._id - 1], "New User": item.total }]))
            }
            catch (err) {
                console.log(err);
            }
        }
        getStats();
    }, [MONTHS])
    console.log(userStats)
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title={"User Analytics"} grid={true} dataKey={"New User"} />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}
