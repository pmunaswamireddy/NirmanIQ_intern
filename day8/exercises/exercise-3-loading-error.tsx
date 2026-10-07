'use client';

// Exercise 3: Loading Skeleton Component
export function LoadingSkeleton({ text = 'Loading data...' }: { text?: string }) {
  return (
    <div className="skeleton-box">
      <p>{text}</p>
    </div>
  );
}

// Exercise 3: Error Boundary with Retry Button
export function ErrorWithRetry({
  message,
  onRetry
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="error-box">
      <h2>Something went wrong!</h2>
      <p>{message}</p>
      <button onClick={onRetry} className="retry-btn">
        Retry
      </button>
    </div>
  );
}
