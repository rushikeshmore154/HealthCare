import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-accent py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Streamline Hospital Bed Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Efficient queue management for hospitals and patients. Real-time bed
            availability and seamless coordination.
          </p>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-200"
              onClick={() => {
                const auth = localStorage.getItem("authToken");
                const role = localStorage.getItem("role");
                if (auth) {
                  if (role === "hospital" || role === "subAdmin") {
                    navigate("/hospital/dashboard");
                  } else {
                    navigate("/home");
                  }
                } else {
                  navigate("/auth/login ");
                }
              }}
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-200"
              onClick={() => {
                document.getElementById("about").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3BpdGFsfGVufDB8fDB8fHww"
            alt="Hospital Queue Management System"
            className="rounded-lg shadow-lg w-full h-full"
          ></img>
        </motion.div>
      </div>
    </section>
  );
}
