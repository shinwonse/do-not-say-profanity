'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const PROFANITY_CRITERIA = 0.5;
const ATTRIBUTES = [
  'TOXICITY',
  'SEVERE_TOXICITY',
  'IDENTITY_ATTACK',
  'INSULT',
  'PROFANITY',
  'THREAT',
];

const analyzeToxicity = async (text: string) => {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY}`;

  const request = {
    comment: { text },
    languages: [],
    requestedAttributes: {
      IDENTITY_ATTACK: {},
      INSULT: {},
      PROFANITY: {},
      SEVERE_TOXICITY: {},
      THREAT: {},
      TOXICITY: {},
    },
  };

  try {
    const response = await axios.post(url, request);
    const data = Object.values(response.data.attributeScores);
    return (
      data
        // eslint-disable-next-line array-callback-return,consistent-return
        .map((item, idx) => {
          // @ts-ignore
          if (item.summaryScore.value > PROFANITY_CRITERIA) {
            // @ts-ignore
            return [ATTRIBUTES[idx], item.summaryScore.value];
          }
        })
        .filter((item) => item !== undefined)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error('Error analyzing toxicity:', error);
  }
};

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any[]>([]); // [ [ { TOXICITY: { summaryScore: { value: 0.5 } } }, 0.5 ]

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  // eslint-disable-next-line consistent-return
  const onSubmit = async () => {
    const results = await analyzeToxicity(input);
    // @ts-ignore
    setResult(results);
  };

  return (
    <main className="flex min-h-[1000px] flex-col items-center p-24 bg-gray-800">
      <h1 className="font-bold text-2xl mb-10 text-white">
        DO NOT SAY PROFANITY
      </h1>
      <textarea
        className="rounded w-[500px] text-black border border-black h-[400px] p-5"
        onChange={handleChange}
      />
      <button
        className="border border-blue-600 bg-blue-100 rounded w-[500px] h-10 mt-2"
        onClick={onSubmit}
        type="button"
      >
        검사하기
      </button>
      <div className="p-5 bg-white w-full rounded mt-8 min-h-[200px]">
        {result.length ? (
          <div>
            {result.map((item, idx) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={idx}>
                  <span>
                    {item[0]} : {item[1]}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>욕설이 감지되지 않았습니다.</div>
        )}
      </div>
    </main>
  );
}
