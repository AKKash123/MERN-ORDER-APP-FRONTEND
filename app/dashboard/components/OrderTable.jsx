"use client";

import { useState, useMemo } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

export default function OrderTable({ orders, setOrders }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Search filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase();
      return (
        order.userName?.toLowerCase().includes(q) ||
        order.userEmail?.toLowerCase().includes(q) ||
        order.status?.toLowerCase().includes(q)
      );
    });
  }, [orders, searchQuery]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Handle status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch(`https://shop-backend-91h1.onrender.com/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update order status");

      const updated = await res.json();

      setOrders((prev) =>
        prev.map((order) => (order._id === updated.order._id ? updated.order : order))
      );

      toast.success(`✅ Order status updated to ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update order status.");
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`https://shop-backend-91h1.onrender.com/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("🗑️ Order deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete order.");
    }
  };

  // ✅ Generate Money Receipt (PDF)
  const generateReceipt = (order) => {
    const doc = new jsPDF();

    // 🔹 HEADER SECTION
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Meralay Wollen Designs", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Official Money Receipt", 14, 28);

  // 🔹 Horizontal Divider
  doc.setDrawColor(200);
  doc.line(14, 32, 196, 32);

  // 🔹 RECEIPT INFO
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Receipt No: ${order._id}`, 14, 42);
  doc.text(`Date: ${new Date(order.updatedAt).toLocaleString()}`, 140, 42);

  // 🔹 CUSTOMER DETAILS BOX
  doc.setDrawColor(230);
  doc.roundedRect(14, 48, 182, 38, 3, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Customer Details", 18, 56);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.text(`Name: ${order.userName}`, 18, 66);
  doc.text(`Email: ${order.userEmail}`, 18, 74);
  doc.text(`Phone: ${order.userPhone}`, 18, 82);

  // 🔹 ORDER DETAILS BOX
  doc.setDrawColor(230);
  doc.roundedRect(14, 92, 182, 50, 3, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Order Details", 18, 100);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.text(`Design: ${order.design}`, 18, 110);
  doc.text(`Quantity: ${order.quantity}`, 18, 118);
  doc.text(`Price (INR): ${order.pricePerUnit || "-"}`, 18, 126);
  doc.text(`Total Amount (INR): ${order.totalAmount || "-"}`, 18, 134);
  doc.text(`Status: ${order.status}`, 18, 142);

  // 🔹 SHIPPING DETAILS BOX (Now correctly placed below Order box)
  doc.setDrawColor(230);
  doc.roundedRect(14, 152, 182, 40, 3, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Shipping Details", 18, 160);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  doc.text(`Address: ${order.address || "N/A"}`, 18, 170);
  doc.text(`Postal Code: ${order.pincode || "N/A"}`, 18, 178);

  // 🔹 FOOTER SECTION (Spaced correctly)
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text("Thank you for shopping with Meralay Wollen Designs!", 14, 200);
  doc.text("This is a system-generated receipt. No signature required.", 14, 208);

 
    // 🔹 Border outline (optional aesthetic touch)
    doc.setDrawColor(180);
    doc.rect(10, 10, 190, 277, "S");

    // ✅ Auto filename with order ID
    doc.save(`Receipt_${order.userName}_${order._id}.pdf`);

    toast.success("💰 Money receipt downloaded!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-700">Orders</h2>

        <input
          type="text"
          placeholder="🔍 Search by name, email or status..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full md:w-80"
        />
      </div>

      {/* Orders Table */}
      {currentOrders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No matching orders found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Design</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Total Amount</th>
                <th className="p-3 text-left">Shipment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-3 font-medium">{order.userName}</td>
                  <td className="p-3">{order.userEmail}</td>
                  <td className="p-3">{order.userPhone}</td>
                  <td className="p-3">{order.design}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.totalAmount}</td>
                  <td className="p-3">{order.address} {order.pincode}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                      className={`border rounded px-2 py-1 text-sm ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-3 flex justify-center gap-2">
                    {/* 🧾 Download Receipt Button */}
                    {order.status === "Completed" && (
                      <button
                        onClick={() => generateReceipt(order)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Receipt
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-gray-700 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}