"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import ItemTable from "./components/ItemTable";
import LogoutButton from "./components/LogoutButton";
import OrderTable from "./components/OrderTable";
import { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Items & Orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, ordersRes] = await Promise.all([
          fetch("https://mern-order-app-backend.vercel.app/api/items"),
          fetch("https://mern-order-app-backend.vercel.app/api/orders"),
        ]);

        // ✅ Check if both are valid JSON
        const itemsText = await itemsRes.text();
        const ordersText = await ordersRes.text();

        const itemsData = itemsText ? JSON.parse(itemsText) : [];
        const ordersData = ordersText ? JSON.parse(ordersText) : [];

        setItems(itemsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("❌ Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            Admin Dashboard
          </h1>
          <LogoutButton />
        </div>

        {/* Tabs */}
        {activeTab === "items" ? (
          <ItemTable items={items} setItems={setItems} />
        ) : (
          <OrderTable orders={orders} setOrders={setOrders} />
        )}
      </div>
    </div>
  );
}
