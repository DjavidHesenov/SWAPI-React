import { AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  backTo?: string; // Optional override if you want to manually control it
}

export default function ErrorMessage({ message, onRetry, backTo }: ErrorMessageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically derive base path like /starships from /starships/33
  const derivedBackPath = backTo || `/${location.pathname.split('/')[1]}`;

  const handleGoBack = () => {
    navigate(derivedBackPath);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-2" />
      <p className="text-red-500 mb-4">{message}</p>

      <div className="flex gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        )}
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors"
        >
          Back to {derivedBackPath.replace('/', '').charAt(0).toUpperCase() + derivedBackPath.slice(2)}
        </button>
      </div>
    </div>
  );
}
