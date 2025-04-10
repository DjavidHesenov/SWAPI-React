import { Link } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  subtitle?: string;
  details: { label: string; value: string }[];
  to: string;
}

export default function ResourceCard({ title, subtitle, details, to }: ResourceCardProps) {
  return (
    <Link
      to={to}
      className="block bg-[#1A1F2E] rounded-lg p-6 hover:bg-[#2A304A] transition-all duration-300 h-full"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-gray-400 mb-4">{subtitle}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {details.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-white">{value}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}