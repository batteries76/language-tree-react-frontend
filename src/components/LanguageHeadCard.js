import React from 'react';

function LangaugeHeadCard({ currentHead, openWiki }) {

  return (
        <div 
            className={`language-card-head-title ${currentHead.alive}`}
            onClick={() => openWiki(currentHead.name)}
        >
            <h2> { currentHead.name } </h2>
        </div>
  );
}

export default LangaugeHeadCard;