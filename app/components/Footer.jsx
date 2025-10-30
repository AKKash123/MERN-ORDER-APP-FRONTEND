export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Column 1 */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">Wollen Designs</h3>
          <p className="text-sm opacity-80">
            Crafting premium woolen clothing with customizable designs made to
            match your unique style.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-yellow-400 transition">
                Shop
              </a>
            </li>
            <li>
              <a href="/track" className="hover:text-yellow-400 transition">
                Track Orders
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Stay Connected
          </h4>
          <p className="text-sm opacity-80 mb-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="p-2 rounded-l-md w-full focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 rounded-r-md hover:bg-yellow-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Wollen Designs — Crafted by E-Web Solutions
      </div>
    </footer>
  );
}
