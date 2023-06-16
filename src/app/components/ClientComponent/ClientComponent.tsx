'use client';

import axios from 'axios';
import { useState } from 'react';

import Button from '@/app/components/Button';
import ResultBox from '@/app/components/ResultBox';
import TextArea from '@/app/components/TextArea';

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
    // eslint-disable-next-line consistent-return
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
    // eslint-disable-next-line no-console,consistent-return
    return console.error('Error analyzing toxicity:', error);
  }
};

function ClientComponent() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any[]>([]); // [ [ { TOXICITY: { summaryScore: { value: 0.5 } } }, 0.5 ]

  // eslint-disable-next-line consistent-return
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
