'use client';

type Props = {
  onClick: () => void;
};

function Button({ onClick }: Props) {
  return (
    <button
      className="border border-blue-600 bg-blue-100 rounded w-full h-10 mt-2"
      onClick={onClick}
      type="button"
    >
      검사하기
    </button>
  );
}

export default Button;
