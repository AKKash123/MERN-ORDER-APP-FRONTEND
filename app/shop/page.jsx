"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    address:"",
    pincode:"",
    quantity: 1,
  });
  const [totalAmount, setTotalAmount] = useState(0);

  // ✅ Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("https://shop-backend-91h1.onrender.com/api/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load shop items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // ✅ Update total when quantity or selected item changes
  useEffect(() => {
    if (selectedItem) {
      const total = (selectedItem.price || 0) * (Number(formData.quantity) || 1);
      setTotalAmount(total);
    }
  }, [selectedItem, formData.quantity]);

  // ✅ Handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem) return toast.error("Please select an item first.");

    try {
      const orderData = {
        ...formData,
        design: selectedItem.name,
        quantity: Number(formData.quantity),
        pricePerUnit: selectedItem.price,
        totalAmount: totalAmount,
      };

      const res = await fetch("https://shop-backend-91h1.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("🎉 Order placed successfully!");
        setSelectedItem(null);
        setFormData({ userName: "", userEmail: "", userPhone: "", quantity: 1 });
        setTotalAmount(0);
      } else {
        toast.error(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while placing order.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10 animate-pulse">Loading items...</p>;

  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🧶 Wollen <span className="text-indigo-600">Designs</span> Shop
      </h1>

      {/* ✅ Item Grid */}
      {items.length === 0 ? (
        <p className="text-center text-gray-600">No items available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={`https://shop-backend-91h1.onrender.com${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col justify-between h-44">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {item.description || "No description available"}
                  </p>
                </div>

                <div className="mt-auto">
                  <p className="text-indigo-600 font-bold mb-1">₹{item.price}</p>
                  <p
                    className={`text-sm mb-2 ${
                      item.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
                  </p>

                  <button
                    disabled={item.stock <= 0}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full py-2 rounded-md font-semibold text-center ${
                      item.stock > 0
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {item.stock > 0 ? "🛒 Order Now" : "Sold Out"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Order Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order: {selectedItem.name}
            </h2>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={formData.userPhone}
                onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Your Full Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                placeholder="Your postal Code"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />

              {/* ✅ Display Price and Total */}
              <div className="bg-gray-50 border rounded-md p-3">
                <p className="text-sm text-gray-600">
                  <strong>Price per Unit:</strong> ₹{selectedItem.price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {formData.quantity}
                </p>
                <p className="text-lg font-semibold text-indigo-700 mt-2">
                  Total: ₹{totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
