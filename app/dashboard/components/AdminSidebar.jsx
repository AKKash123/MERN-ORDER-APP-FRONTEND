export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-red-700 text-white flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Wollen Admin</h2>
      <button
        onClick={() => setActiveTab("items")}
        className={`text-left px-4 py-2 rounded ${
          activeTab === "items" ? "bg-indigo-500" : "hover:bg-indigo-600"
        }`}
      >
        🧶 Manage Items
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        className={`text-left px-4 py-2 rounded ${
          activeTab === "orders" ? "bg-indigo-500" : "hover:bg-indigo-600"
        }`}
      >
        📦 Manage Orders
      </button>
    </div>
  );
}
