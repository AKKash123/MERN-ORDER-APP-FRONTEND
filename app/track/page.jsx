"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Search, PackageCheck, Truck, CheckCircle } from "lucide-react";

export default function OrderTrack() {
  const [searchType, setSearchType] = useState("email");
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!query.trim()) return toast.error("Please enter your order details!");

    setLoading(true);
    setOrder(null);

    try {
      const res = await fetch(
        `https://shop-backend-91h1.onrender.com/api/orders/track?${
          searchType === "email" ? "email" : "id"
        }=${query.trim()}`
      );
      const data = await res.json();

      if (res.ok && data.order) {
        setOrder(data.order);
        toast.success("✅ Order found!");
      } else {
        toast.error(data.message || "Order not found!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while tracking order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Toaster position="top-center" />

      {/* 🌟 HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-center text-white shadow-lg">
        <div className="absolute inset-0">
          <img
            src="/assets/images/track-bg.jpg"
            alt="Track Order Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-extrabold mb-3 drop-shadow-md">
            Track Your Order
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Stay updated on your <span className="font-semibold">Meralay Wollen Designs</span> order.
          </p>
        </div>
      </section>

      {/* 🔍 ORDER TRACK FORM */}
      <section className="w-full max-w-2xl bg-white -mt-12 rounded-2xl shadow-xl p-8 border border-gray-100 z-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Enter your order details
        </h2>

        <form onSubmit={handleTrackOrder} className="space-y-4">
          <div className="flex justify-center gap-3 mb-2">
            <button
              type="button"
              onClick={() => setSearchType("email")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                searchType === "email"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              By Email
            </button>
            <button
              type="button"
              onClick={() => setSearchType("id")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                searchType === "id"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              By Order ID
            </button>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type={searchType === "email" ? "email" : "text"}
              placeholder={
                searchType === "email"
                  ? "Enter your registered email"
                  : "Enter your Order ID"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 transition flex items-center gap-2"
            >
              <Search size={16} />
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>
        </form>

        {/* 📦 ORDER DETAILS */}
        {order && (
          <div className="mt-10 border-t border-gray-200 pt-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Order Summary
            </h3>

            <div className="bg-gray-50 rounded-lg p-5 shadow-inner space-y-2 text-sm text-gray-700">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Name:</strong> {order.userName}
              </p>
              <p>
                <strong>Email:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Design:</strong> {order.design}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Placed On:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* 🧭 STATUS TIMELINE */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3 text-gray-800 text-center">
                Current Order Status
              </h4>
              <div className="flex items-center justify-between">
                {["Pending", "Processing", "Completed", "Cancelled"].map(
                  (status, i) => {
                    const currentIndex = [
                      "Pending",
                      "Processing",
                      "Completed",
                      "Cancelled",
                    ].indexOf(order.status);

                    const isActive = i === currentIndex;
                    const isDone = i < currentIndex;

                    return (
                      <div
                        key={status}
                        className="flex flex-col items-center text-center w-1/4"
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                            isActive
                              ? "bg-indigo-600"
                              : isDone
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {isDone ? <CheckCircle size={18} /> : i + 1}
                        </div>
                        <p className="text-xs mt-2 text-gray-700">{status}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 🚚 Decorative Section */}
      <div className="mt-16 text-center text-gray-500 text-sm flex items-center gap-2">
        <Truck size={16} />
        <span>Powered by Meralay Wollen Designs</span>
      </div>
    </div>
  );
}