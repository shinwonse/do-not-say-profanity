'use client';

type Props = {
  result: any;
};

const PROFANITY_CRITERIA = 0.5;

function ResultBox({ result }: Props) {
  return (
    <div className="p-5 bg-white w-full rounded mt-8 min-h-[140px] overflow-scroll overflow-x-hidden">
      {result !== -1 ? (
        <div>
          <div>
            {result > PROFANITY_CRITERIA ? (
              <span className="text-red-500">부적절</span>
            ) : (
              <span className="text-green-500">적절</span>
            )}
          </div>
          <span>비속어 확률 {Math.ceil(result * 100)}%</span>
        </div>
      ) : (
        <div>상단 박스에 텍스트를 입력해주세요.</div>
      )}
    </div>
  );
}

export default ResultBox;
