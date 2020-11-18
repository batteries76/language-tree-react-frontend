import React from 'react';

/****************************
****** COLOURS FOR MAP ******
< 1%: PAPAYAWHIP
1-2%: KHAKI
2-5%: YELLOW
5-10%: ORANGE
10-20%: DARKORANGE
20-40%: ORANGERED
40-60%: RED
60-80%: FIREBRICK
80-100%: DARKRED
No percentage data: LIGHTSTEELBLUE
****************************/

function LanguagePercentageKey() {

  return (
        <div className="language-percentage-wrapper">
            <div className="language-percentage-key">
                <div className="language-key-group">
                    <div className="language-percentage-colour one">   
                    </div>
                    <div className="language-percentage-type">
                        Less than 1%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour two">   
                    </div>
                    <div className="language-percentage-type">
                        1 to 2%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour three">   
                    </div>
                    <div className="language-percentage-type">
                        2 to 5%
                    </div>
                </div>
            </div>
            <div className="language-percentage-key">
                <div className="language-key-group">
                    <div className="language-percentage-colour four">   
                    </div>
                    <div className="language-percentage-type">
                        5 to 10%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour five">   
                    </div>
                    <div className="language-percentage-type">
                        10 to 20%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour six">   
                    </div>
                    <div className="language-percentage-type">
                        20 to 40%
                    </div>
                </div>
            </div>
            <div className="language-percentage-key">
                <div className="language-key-group">
                    <div className="language-percentage-colour seven">   
                    </div>
                    <div className="language-percentage-type">
                        40 to 60%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour eight">   
                    </div>
                    <div className="language-percentage-type">
                        60 to 80%
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour nine">   
                    </div>
                    <div className="language-percentage-type">
                        80 to 100%
                    </div>
                </div>
            </div>
            <div className="language-percentage-key">
                <div className="language-key-group">
                    <div className="language-percentage-colour ten">   
                    </div>
                    <div className="language-percentage-type">
                        No % data 
                    </div>
                </div>
                <div className="language-key-group">
                    <div className="language-percentage-colour eleven">   
                    </div>
                    <div className="language-percentage-type">
                        Language Family
                    </div>
                </div>
            </div>
        </div>
  );
}

export default LanguagePercentageKey;