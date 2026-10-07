'use client';

// Exercise 3: Error boundary with retry button
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-box">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="retry-btn">
        Retry
      </button>
    </div>
  );
}
