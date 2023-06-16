'use client';

type Props = {
  result: any[][];
};

const PROFANITY_CRITERIA = 0.5;

function ResultBox({ result }: Props) {
  return (
    <div className="p-5 bg-white w-full rounded mt-8 min-h-[140px] overflow-scroll overflow-x-hidden">
      {result?.length ? (
        <div>
          {result?.map((item, idx) => {
            return (
              <div key={idx}>
                <span>{item[0]}</span>
                <span
                  style={{
                    color: item[1] > PROFANITY_CRITERIA ? 'red' : 'green',
                  }}
                >
                  : {item[1]}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div>상단 박스에 텍스트를 입력해주세요.</div>
      )}
    </div>
  );
}

export default ResultBox;
