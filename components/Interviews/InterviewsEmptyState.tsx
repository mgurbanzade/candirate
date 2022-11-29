export default function InterviewsEmptyState({ onClick }: { onClick: any }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block w-full rounded-lg border-4 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mx-auto h-12 w-12 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Schedule an interview
      </span>
    </button>
  );
}
