
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

const challenges = [
  {
    icon: EyeOff,
    title: "The Public Menu Reading",
    description: "When a menu isn't accessible, the simple act of choosing a meal becomes a public performance. Staff or companions must read everything aloud, stripping away the quiet, personal moment of decision.",
    image: "/placeholder.svg",
    alt: "Illustration of an open menu with a large eye crossed out, symbolizing inaccessible menus.",
  },
  {
    icon: Users,
    title: "A Loss of Connection",
    description: "Dining is a social experience. The simple act of discussing the menu with a partner is lost when one person is solely reliant on the other to understand their options, creating a subtle barrier.",
    image: "/placeholder.svg",
    alt: "Illustration showing two figures at a table with a broken link between them, representing lost connection.",
  },
  {
    icon: BookOpen,
    title: "The Illusion of Choice",
    description: "Without the ability to browse freely, diners often default to 'what's popular?' or a companion's suggestion. This isn't true choice; it's a compromise that limits personal preference and discovery.",
    image: "/placeholder.svg",
    alt: "Illustration of a menu with several options faded out and only one highlighted.",
  },
];

const ImpactMetrics = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="impact" className="py-24 bg-subtle-gray/50 bg-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-dark-text mb-4">
            Dining Through a Different Lens
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            For millions of people with vision impairments, a simple meal out is filled with hidden barriers. It's more than just reading a menu; it's about dignity, independence, and connection.
          </p>
        </motion.div>

        <div className="space-y-24 mb-24">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={cn("text-left", index % 2 !== 0 && "md:order-2")}>
                <div className="w-16 h-16 bg-brand-navy/10 text-brand-navy rounded-xl flex items-center justify-center mb-6">
                  <challenge.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-dark-text mb-4">{challenge.title}</h3>
                <p className="text-lg text-medium-text leading-relaxed">
                  {challenge.description}
                </p>
              </div>
              <div className={cn(index % 2 !== 0 && "md:order-1")}>
                <img 
                  src={challenge.image} 
                  alt={challenge.alt} 
                  className="rounded-lg shadow-medium w-full h-auto object-cover aspect-video" 
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="structured-card bg-brand-navy text-off-white p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-heading font-bold mb-4 headline-underline after:bg-brand-terracotta">
                This is Where We Come In
              </h3>
              <p className="text-lg text-off-white/80 leading-relaxed">
                Accessly provides free, high-quality braille menus to restaurants, no questions asked. We believe that access shouldn't be an afterthought. It’s a fundamental part of hospitality that empowers independence, ensures privacy, and fosters a more inclusive dining experience for everyone.
              </p>
            </div>
            
            <div className="bg-black/20 p-6 rounded-lg border border-off-white/20">
              <blockquote className="text-xl font-heading italic text-off-white leading-relaxed">
                "For the first time, I felt like just another customer, not a burden. That feeling is priceless."
              </blockquote>
              <p className="font-sans text-sm text-off-white/70 mt-4">— Jessica L., Diner in Austin, TX</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
