export default function Testimonial() {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "HospitalQ made hospital visits so much easier! Quick and efficient service.",
    },
    {
      name: "Jane Smith",
      feedback: "Amazing platform! Reduced waiting times significantly.",
    },
    {
      name: "Michael Lee",
      feedback: "A must-have for any hospital. The bed management system is top-notch!",
    },
  ];

  return (
    <section id="testimonials" className="py-20 text-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg italic">"{testimonial.feedback}"</p>
              <h3 className="text-xl font-bold mt-4">- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}