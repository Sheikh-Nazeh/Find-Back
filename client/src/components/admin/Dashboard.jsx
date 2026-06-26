import { useEffect, useState } from "react";

import AdminSidebar from "./AdminSidebar";

import { getDashboardStats } from "../../services/itemService";

export default function Dashboard() {

    const [stats, setStats] = useState({
        users: 0,
        reports: 0,
        pending_reports: 0,
        pending_claims: 0,
        resolved_items: 0,
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex">

            <AdminSidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white border rounded-2xl p-6">
                        <h3 className="text-gray-500">
                            Total Users
                        </h3>

                        <p className="text-4xl font-bold">
                            {stats.users}
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6">
                        <h3 className="text-gray-500">
                            Total Reports
                        </h3>

                        <p className="text-4xl font-bold">
                            {stats.reports}
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6">
                        <h3 className="text-gray-500">
                            Pending Reports
                        </h3>

                        <p className="text-4xl font-bold">
                            {stats.pending_reports}
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6">
                        <h3 className="text-gray-500">
                            Pending Claims
                        </h3>

                        <p className="text-4xl font-bold">
                            {stats.pending_claims}
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6">
                        <h3 className="text-gray-500">
                            Resolved Items
                        </h3>

                        <p className="text-4xl font-bold">
                            {stats.resolved_items}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}