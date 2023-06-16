'use client';

import axios from 'axios';
import { useState } from 'react';

import Button from '@/app/components/Button';
import ResultBox from '@/app/components/ResultBox';
import TextArea from '@/app/components/TextArea';

// const PROFANITY_CRITERIA = 0.5;
const ATTRIBUTES = [
  'TOXICITY(비속어)',
  'SEVERE_TOXICITY(심한 비속어)',
  'IDENTITY_ATTACK(인격 모독)',
  'INSULT(모욕)',
  'PROFANITY(욕설)',
  'THREAT(위협)',
];

const analyzeToxicity = async (text: string) => {
  if (!text) return;
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyD0FLOo9XEbmrcjAzI8cC98g-VwoTwASDI`;

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
    return data.map((item, idx) => {
      // @ts-ignore
      return [ATTRIBUTES[idx], item.summaryScore.value];
    });
  } catch (error) {
    return console.error('Error analyzing toxicity:', error);
  }
};

function ClientComponent() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any[]>([]);

  const onSubmit = async () => {
    const results = await analyzeToxicity(input);
    // @ts-ignore
    setResult(results);
  };

  return (
    <>
      <TextArea input={input} setInput={setInput} />
      <Button onClick={onSubmit} />
      <ResultBox result={result} />
    </>
  );
}

export default ClientComponent;
