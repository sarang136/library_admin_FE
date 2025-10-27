import React, { useEffect, useState } from 'react'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { useGetAvailableSeatsQuery } from '../../Redux/Api/SeatApi';

const SeatspiChart = () => {
    const { data } = useGetAvailableSeatsQuery();
    const [seats, setSeats] = useState([]);
    // console.log(data)
    // console.log(data);
    useEffect(() => { setSeats(data?.data) }, [setSeats])
    console.log(seats)

    const occ = seats?.filter(seat =>
        seat?.bookedForMorning || seat?.bookedForEvening || seat?.bookedForFullDay
    );
    console.log(occ.length);

    const vac = seats?.filter(seat =>
        seat?.bookedForMorning === false || seat?.bookedForMorning === null &&
        seat?.bookedForEvening === false || seat?.bookedForEvening === null &&
        seat?.bookedForFullDay === false || seat?.bookedForFullDay === null
    );
    console.log(vac.length);

    const booked = (seats || []).filter((book) => book?.status === "booked");
    const pending = (seats || []).filter((book) => book?.status === "pending");
    const seatData = [
        { name: "Occupied", value: occ.length },
        { name: "Vacant", value: vac.length },
    ];
    const COLORS = ["#2563eb", "#facc15"];

    return (
        <div className="bg-white rounded-2xl p-6 w-full lg:w-[35%] sm:w-11/12 mx-auto -mt-3">
            <div className=" rounded-2xl p-2 ">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Seat Occupancy Pie Chart
                </h2>
                <div className="flex flex-col items-center w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={seatData}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%" // responsive
                                outerRadius="80%" // responsive
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {seatData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 mt-4 gap-2">
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Occupied seats ({occ.length})</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-sm">Vacant Seats ({vac.length})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatspiChart;
