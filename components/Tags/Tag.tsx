type Props = {
  data: { id: number; name: string };
  withRemoveBtn?: boolean;
  onRemove?: (data: any) => void;
};

const Tag = ({ data, withRemoveBtn, onRemove }: Props) => {
  const { id, name } = data;
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2 pr-2 mr-1 mb-1 text-xs font-medium text-indigo-700">
      {name}
      {withRemoveBtn && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
        >
          <span className="sr-only">Remove</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Tag;
