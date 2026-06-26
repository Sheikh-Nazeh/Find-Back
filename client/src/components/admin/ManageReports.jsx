import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import { getPendingReports } from "../../services/itemService";

export default function ManageReports() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
  fetchReports();
}, []);

const fetchReports = async () => {
  try {
    const data = await getPendingReports();
    setReports(data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex">
      <AdminSidebar />

      {reports.map((report) => (

  <div
    key={report.id}
    className="bg-white border rounded-2xl p-6 mb-4"
  >

    <h3 className="font-semibold text-xl">
      {report.title}
    </h3>

    <p className="text-gray-600 mt-2">
      {report.description}
    </p>

    <p className="mt-2">
      <strong>Type:</strong> {report.item_type}
    </p>

    <p>
      <strong>Location:</strong> {report.location}
    </p>

    <p>
      <strong>Date:</strong> {report.reported_date}
    </p>

    <div className="flex gap-3 mt-5">

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
        Approve
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
        Reject
      </button>

    </div>

  </div>

))}
    </div>
  );
}