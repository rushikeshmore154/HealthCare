import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Smooth scrolling function
    const handleScroll = (id) => {
        setIsOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="bg-white fixed top-0 left-0 w-full shadow-sm z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        HospitalQ
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                    <NavLink onClick={() => handleScroll("features")}>
                        Features
                    </NavLink>
                    <NavLink onClick={() => handleScroll("testimonials")}>
                        Testimonials
                    </NavLink>
                    <NavLink onClick={() => handleScroll("about")}>
                        About Us
                    </NavLink>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-800 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-white py-2 shadow-md"
                    >
                        <NavLink
                            onClick={() => handleScroll("features")}
                            mobile
                        >
                            Features
                        </NavLink>
                        <NavLink
                            onClick={() => handleScroll("testimonials")}
                            mobile
                        >
                            Testimonials
                        </NavLink>
                        <NavLink onClick={() => handleScroll("about")} mobile>
                            About Us
                        </NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// NavLink Component
function NavLink({ children, onClick, mobile = false }) {
    return (
        <button
            onClick={onClick}
            className={`text-gray-600 hover:text-gray-800 transition-colors duration-200 ${
                mobile ? "block py-2 px-4 w-full text-left" : ""
            }`}
        >
            {children}
        </button>
    );
}
