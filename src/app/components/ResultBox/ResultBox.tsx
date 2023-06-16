'use client';

type Props = {
  result: any[][];
};

function ResultBox({ result }: Props) {
  return (
    <div className="p-5 bg-white w-full rounded mt-8 min-h-[120px]">
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
  );
}

export default ResultBox;
