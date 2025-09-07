import { motion } from "framer-motion"
import { Hospital, Users, Clock, Bell } from "lucide-react"

const features = [
  {
    icon: Hospital,
    title: "Real-time Bed Availability",
    description: "View up-to-date information on bed availability across multiple hospitals.",
  },
  {
    icon: Users,
    title: "Efficient Patient Management",
    description: "Streamline patient queue and bed allocation processes for hospitals.",
  },
  {
    icon: Clock,
    title: "Reduced Waiting Times",
    description: "Minimize patient waiting times with our advanced queue management system.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Receive real-time updates on bed availability and queue status.",
  },
]

export default function Features() {
  return (
    (<section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>)
  );
}

