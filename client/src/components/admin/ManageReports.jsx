import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import {
  getPendingReports,
  approveReport,
  rejectReport,
} from "../../services/itemService";

export default function ManageReports() {
  const [reports, setReports] = useState([]);

useEffect(() => {

  const fetchReports = async () => {
    try {
      const data = await getPendingReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchReports();

}, []);

const handleApprove = async (id) => {
  try {
    await approveReport(id);
    alert("Report approved");

    const data = await getPendingReports();
    setReports(data);

  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (id) => {
  try {
    await rejectReport(id);
    alert("Report rejected");

    const data = await getPendingReports();
    setReports(data);

  } catch (error) {
    console.error(error);
  }
};

  return (
  <div className="flex">
    <AdminSidebar />

    <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Pending Reports
      </h1>

      {reports.length === 0 ? (
        <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">
          No pending reports.
        </div>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            className="bg-white border rounded-2xl p-6 mb-6 shadow-sm"
          >
            <h3 className="text-2xl font-semibold">
              {report.title}
            </h3>


            <div className="grid md:grid-cols-2 gap-2 mt-5 text-sm">
              <p>
                <strong>Category:</strong> {report.category}
              </p>

              <p>
                <strong>Type:</strong> {report.type}
              </p>

              <p>
                <strong>Location:</strong> {report.location}
              </p>

              <p>
                <strong>Date:</strong> {report.date}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleApprove(report.id)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(report.id)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}