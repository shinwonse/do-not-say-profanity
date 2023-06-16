'use client';

import { ChangeEvent } from 'react';

type Props = {
  input: string;
  setInput: (input: string) => void;
};

function TextArea({ input, setInput }: Props) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  return (
    <textarea
      className="rounded w-full text-black border border-black h-full min-h-[250px] max-h-[400px] p-5"
      onChange={handleChange}
      value={input}
    />
  );
}

export default TextArea;
