import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const Publications = () => {
  return (
    <Section id="publications" title="Publications">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Publication Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <a
            href="https://ieeexplore.ieee.org/document/11195049"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlassCard className="p-6 flex items-center justify-between group hover:border-blue-500/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                  IEEE
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Hardware Trojan Detection with Machine Learning
                  </h4>
                  <p className="text-xs text-slate-700 mt-1">
                    Ashwin Koshy John, Sai Tarrun Pitta, Jaya Dofe, Jai Gopal Pandey
                  </p>
                </div>
              </div>
              <Shield className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </GlassCard>
          </a>
        </motion.div>
      </div>
    </Section>
  );
};
