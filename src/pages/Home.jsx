import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Users, Globe2, Cpu, Blocks, BarChart2 } from "lucide-react"

export default function About() {
  return (
    <div className="bg-white dark:bg-slate-900">

      {/* Hero Section with Background Image */}
      <section
        className="relative bg-center bg-cover bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold"
          >
            About TrustLedgerLabs
          </motion.h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-200">
            Founded in 2024, TrustLedgerLabs is dedicated to building intelligent,
            transparent, and secure digital ecosystems powered by AI-driven
            automation and blockchain infrastructure.
          </p>
        </div>
      </section>

      {/* Mission */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 dark:text-white">
    Our Mission
  </h2>

  <p className="max-w-4xl mx-auto text-center text-xl md:text-2xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
    Our mission is to empower organizations with intelligent automation,
    secure decentralized systems, and future-ready digital infrastructure.
    We bring together advanced AI, machine learning, and blockchain technology
    to deliver solutions that elevate transparency, scalability, and global trust.
  </p>
</section>


      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
          Our Journey
        </h2>

        <div className="space-y-10">
          <div className="card p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-xl dark:text-white">2024 — Founded</h3>
            <p className="text-slate-600 dark:text-slate-300">
              TrustLedgerLabs was established with the goal of merging AI and
              decentralized digital systems.
            </p>
          </div>

          <div className="card p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-xl dark:text-white">
              2025 — First Enterprise Deployment
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Launched our first enterprise-grade AI automation model and
              blockchain analytics pipeline.
            </p>
          </div>

          <div className="card p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-xl dark:text-white">
              2026 — Global Expansion
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Expanded our team and infrastructure to support clients across
              multiple regions.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10 text-center">
        <div>
          <ShieldCheck className="mx-auto h-10 w-10 text-indigo-600 dark:text-emerald-500 mb-3" />
          <h3 className="text-3xl font-bold dark:text-white">500+</h3>
          <p className="text-slate-600 dark:text-slate-400">Users Served</p>
        </div>

        <div>
          <Globe2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-indigo-400 mb-3" />
          <h3 className="text-3xl font-bold dark:text-white">20+</h3>
          <p className="text-slate-600 dark:text-slate-400">Deployments</p>
        </div>

        <div>
          <Users className="mx-auto h-10 w-10 text-indigo-600 dark:text-emerald-500 mb-3" />
          <h3 className="text-3xl font-bold dark:text-white">70+</h3>
          <p className="text-slate-600 dark:text-slate-400">Specialists</p>
        </div>

        <div>
          <BarChart2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-indigo-400 mb-3" />
          <h3 className="text-3xl font-bold dark:text-white">99.99%</h3>
          <p className="text-slate-600 dark:text-slate-400">Uptime</p>
        </div>
      </section>

      {/* Culture */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
          Inside Our Culture
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {[
            {
              title: "Innovation",
              desc: "Pushing boundaries in AI, cryptography, and distributed systems.",
            },
            {
              title: "Ethics",
              desc: "We prioritize fairness, transparency, and responsible innovation.",
            },
            {
              title: "Collaboration",
              desc: "Global teamwork drives solutions that scale and endure.",
            },
            {
              title: "Sustainability",
              desc: "Building energy-conscious, future-proof decentralized systems.",
            },
          ].map((i, index) => (
            <div
              key={index}
              className="card p-6 border border-slate-200 dark:border-slate-800 text-center"
            >
              <h3 className="text-lg font-semibold dark:text-white">
                {i.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                {i.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src="AI.png" className="card h-56 w-full object-cover" />
          <img src="Blockchain.png" className="card h-56 w-full object-cover" />
          <img src="Furturistic.png" className="card h-56 w-full object-cover" />
        </div>
      </section>
    </div>
  )
}
