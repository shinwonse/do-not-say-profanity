'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const analyzeToxicity = async (text: string) => {
  const API_KEY = 'AIzaSyD0FLOo9XEbmrcjAzI8cC98g-VwoTwASDI';
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;

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
    return data.map((item, index) => [
      // @ts-ignore
      response.data.attributeScores,
      // @ts-ignore
      item.summaryScore.value,
    ]);
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error('Error analyzing toxicity:', error);
  }
};

export default function Home() {
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  // eslint-disable-next-line array-callback-return,consistent-return
  const onSubmit = async () => {
    let flag = false;
    const results = await analyzeToxicity(input);
    // eslint-disable-next-line array-callback-return,consistent-return
    results?.map((result, idx) => {
      if (result[1] > 0.6) {
        flag = true;
        // eslint-disable-next-line no-alert
        return alert(
          `😡${Object.keys(result[0])[idx]}: ${
            result[1]
          } 로 비속어 및 욕설로 분류되었습니다.😡`
        );
      }
    });
    // eslint-disable-next-line no-alert
    if (!flag) return alert('😇비속어 및 욕설이 없습니다.😇');
  };

  return (
    <main className="flex min-h-[1000px] flex-col items-center p-24">
      <h1 className="font-bold text-2xl mb-10">DO NOT SAY PROFANITY</h1>
      <textarea
        className="rounded w-[500px] text-black border border-black h-[400px] p-5"
        onChange={handleChange}
      />
      <button
        className="border border-blue-600 rounded w-[200px] mt-10"
        onClick={onSubmit}
        type="button"
      >
        검사하기
      </button>
    </main>
  );
}
