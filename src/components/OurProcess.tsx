import React from "react";

export default function OurProcess() {
  const processSteps = [
    {
      step: "01",
      title: "Strategy",
      desc: "Research, planning and product direction aligned with business goals.",
    },
    {
      step: "02",
      title: "Design",
      desc: "UI/UX crafted for clarity, usability, and high conversion.",
    },
    {
      step: "03",
      title: "Development",
      desc: "Modern, scalable code built for speed and performance.",
    },
    {
      step: "04",
      title: "Launch & Scale",
      desc: "Deployment, optimization and long-term growth support.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            How We Build High-Impact Digital Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Every project follows a proven framework that blends strategy,
            design, and engineering to deliver scalable digital solutions.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200/60"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
