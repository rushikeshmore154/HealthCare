import { useState } from "react";
import { Bell, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 w-full z-50">
            <div className="p-4 flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="font-bold text-xl">
                        HospitalQ
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="flex gap-6 items-center">
                    <div className="hidden md:flex gap-6">
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/auth/login">Login</NavLink>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Bell className="h-4 w-4" />
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden h-9 w-9"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-white shadow-lg p-4"
                    >
                        <NavLink
                            to="/home"
                            mobile
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/auth/login"
                            mobile
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// NavLink Component
function NavLink({ to, children, mobile = false, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block text-lg font-medium transition-colors hover:text-primary ${
                mobile ? "py-2" : "text-muted-foreground"
            }`}
        >
            {children}
        </Link>
    );
}
