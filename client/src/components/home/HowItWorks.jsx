import { Search, FileText, Bell, Handshake } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Search or Browse',
    description: 'Look through our database of lost and found items or use our smart search feature',
  },
  {
    icon: FileText,
    number: '2',
    title: 'Report an Item',
    description: 'Found something? Lost something? Create a detailed report with photos and location',
  },
  {
    icon: Bell,
    number: '3',
    title: 'Get Notified',
    description: 'Receive instant alerts when a potential match is found for your item',
  },
  {
    icon: Handshake,
    number: '4',
    title: 'Reunite',
    description: 'Connect with the other party and arrange a safe meetup to return the item',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500">Simple steps to find what you've lost</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 mx-auto mb-4">
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
