import React from 'react';
import { Results } from '../types';


export type ResultCard = {
  results: Results;
};

const ResultCard: React.FC<ResultCard> = ({ results }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2 my-2 border-b-2 border-solid border-purple-70 pr-4">
        <div className="col-span-2 font-semibold">Candidate</div>
        <div className="col-span-1 font-semibold text-right">Score</div>
      </div>
      <div className="divide-y-2 overflow-y-auto pr-4">
        {results.map((result) => (
          <div
            key={result.nominationId}
            className="grid grid-cols-3 gap-4 my-1 items-center"
          >
            <div className="col-span-2">{result.text}</div>
            <div className="col-span-1 text-right">
              {result.score}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultCard;