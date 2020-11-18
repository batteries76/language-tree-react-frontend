import React from 'react';
import SearchListItem from './SearchListItem'

function LanguageStatusKeyAndSearch({ handleSearchSubmit, handleSearchChange, searchValue, sublist, handleClickSubmit }) {

  return (
        <div className="language-status-and-search">
            <div className="language-status-wrapper">
                <div className="language-status-key">
                    <div className="language-key-group">
                        <div className="language-status-colour y">   
                        </div>
                        <div className="language-status-type">
                            Alive
                        </div>
                    </div>
                    <div className="language-key-group">
                        <div className="language-status-colour n">   
                        </div>
                        <div className="language-status-type">
                            Dead
                        </div>
                    </div>
                    <div className="language-key-group">
                        <div className="language-status-colour f">   
                        </div>
                        <div className="language-status-type">
                            Language family
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-bar"> 
                <form onSubmit={handleSearchSubmit} id="language-search">
                    <label id="search-label">
                        Search:
                        <input id="search-input" type="text" value={ searchValue } onChange={ handleSearchChange } autoComplete="off" />
                    </label>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
                {
                    (searchValue.length > 0)
                    ?
                    <div className="search-sublist-wrapper">
                        {
                            sublist.map((language, key) => {
                                console.log("IN THE SUBLIST LOOP")
                                // return <h1> BLAH </h1>
                                return (
                                            <SearchListItem  
                                                key={`${language.name}-${key}`}
                                                handleClickSubmit={ handleClickSubmit }
                                                languageName={ language }
                                            />
                                        )
                                    
                            })
                        }
                    </div>
                    :
                    <div></div>
                }   
            </div>
        </div>
  );
}

export default LanguageStatusKeyAndSearch;