import React from "react";
import { Users, Globe2, Cpu, Blocks, Linkedin, ShieldCheck, Server } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-20">
      
      {/* Hero Intro */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-slate-800 dark:text-slate-100">
          About TrustLedgerLabs
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
          TrustLedgerLabs builds modern infrastructure at the intersection of{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">Artificial Intelligence </span> 
           and <span className="font-semibold text-blue-600 dark:text-blue-400">Blockchain technology</span>.  
          Since 2024, we have focused on delivering solutions that bring{" "}
          <em>trust, intelligence, and scalability</em> to businesses and innovators worldwide.
        </p>
      </section>

      {/* Mission / Vision / Values */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Mission",
            text: "To empower organizations with transparent, automated decision-making through AI-driven blockchain solutions."
          },
          {
            title: "Vision",
            text: "To become a global catalyst where decentralized trust meets artificial intelligence—transforming industries."
          },
          {
            title: "Core Values",
            text: "Integrity, transparency, technical excellence, and curiosity."
          }
        ].map((item) => (
          <div
            key={item.title}
            className="p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 
              bg-white dark:bg-slate-900"
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Company Stats */}
      <section className="grid md:grid-cols-4 gap-8 text-center">
        {[
          { value: "2024", label: "Year Founded" },
          { value: "10+", label: "Team Members" },
          { value: "500+", label: "Users Served" },
          { value: "99.99%", label: "System Reliability" }
        ].map((stat) => (
          <div key={stat.label}>
            <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
              {stat.value}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Tech Focus Areas */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
          Our Technology Focus
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { icon: Cpu, text: "AI-Driven Automation" },
            { icon: Blocks, text: "Smart Contract Infrastructure" },
            { icon: ShieldCheck, text: "Zero-Trust Security" },
            { icon: Server, text: "Scalable Data Pipelines" },
            { icon: Globe2, text: "Decentralized Applications" }
          ].map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-2 px-4 py-2 
                bg-blue-100 dark:bg-blue-900/20 
                text-blue-700 dark:text-blue-300 rounded-full"
            >
              <item.icon size={18} /> {item.text}
            </span>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
          Our Journey
        </h2>

        <div className="space-y-6">
          {[
            {
              year: "2024 — Founded",
              text: "TrustLedgerLabs was established with the mission to build secure and intelligent infrastructure powered by AI and blockchain."
            },
            {
              year: "2024 — MVP Development",
              text: "Our team focused on building the first version of our core platform, validating its architecture with early testers and industry advisors."
            },
            {
              year: "2025 — Early Adoption",
              text: "Successfully onboarded initial users and partnered with small businesses to deploy pilot integrations and refine real-world performance."
            }
          ].map((entry) => (
            <div
              key={entry.year}
              className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow 
                border border-slate-200 dark:border-slate-800"
            >
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                {entry.year}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{entry.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
