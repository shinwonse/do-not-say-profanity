'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const analyzeToxicity = async (text: string) => {
  const API_KEY = 'AIzaSyD0FLOo9XEbmrcjAzI8cC98g-VwoTwASDI';
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;

  const request = {
    comment: { text },
    languages: [],
    requestedAttributes: { TOXICITY: {} },
  };

  try {
    const response = await axios.post(url, request);
    return response.data.attributeScores.TOXICITY.summaryScore.value;
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

  const onSubmit = async () => {
    const score = await analyzeToxicity(input);
    // eslint-disable-next-line no-alert
    if (score > 0.7) return alert('You are toxic 😡');
    // eslint-disable-next-line no-alert
    return alert('You are not toxic 😇');
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
        Check Profanity
      </button>
    </main>
  );
}
