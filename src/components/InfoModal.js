import React from 'react';

function InfoModal(props) {

//   console.log("PROPS IN INFO AREA")
//   console.log(props)

  let wrapperclassName = 'modal-wrapper'
  let modalClassName = 'info-modal'

  if (props.show) {
      console.log("INFO MODAL RUE")
      wrapperclassName = 'modal-wrapper show-wrapper'
      modalClassName = 'info-modal show-modal'
  }

  return (
        <div className={ wrapperclassName } onClick={ () => { props.hide() } } >
            <div className={ modalClassName } onClick={ (e) => e.stopPropagation() } >
                <h2> Language Tree Info </h2>
 
                <span role="img" aria-label="small leafy tree branch"> 🌿</span>
                <p>
                    A little side project that I've had in mind for some years now. 
                    The idea is to show the locations of the various languages and language families.
                    It's just a labour of love for me, and I've had to use whatever data I could find, so it has some rough and ready aspects. I'm happy to hear feedback so that I can fix glaring errors (or small ones) - although I make no guarantees. (Happy enough to change this font if it causes too many screaming people thrashing at keyboards.)
                </p>
                <span role="img" aria-label="small leafy tree branch"> 🌿 </span>
                <p>
                    You can traverse up and down the language tree, and where the data is available you should be able to see some maps relating to the language that is 'selected'. Sometimes you will have to be a bit patient - the bigger language families have huge amounts of data. They will show up eventually. I'm working on ways to bring down that time now. As it stands, it's counts any country that speaks one of it's child languages (even if it is under 1%), and filters that data back up the tree. This helps to explain some of the huge numbers of countries up near the top.
                </p>
                <span role="img" aria-label="small leafy tree branch"> 🌿 </span>
                <p>
                    Over time I hope to be able to impriove things by adding more data, a search feature, and also wiki integration. Also, I'll be adding in the other language families over the next couple of weeks (hopefully.. if the data is there, and I have time). 
                </p>
                <span role="img" aria-label="small leafy tree branch"> 🌿 </span>
                <p>
                    Please send any comments or corrections to matthew.mitchell.mckenzie@gmail.com. I'm happy to respond when I get a chance, or to implement improvements. 
                </p>
                <span role="img" aria-label="small leafy tree branch"> 🌿 </span>

                <h2> References </h2>
                
                <p>
                    https://www.angmohdan.com/the-root-of-all-human-languages/
                </p>
                <p>
                    https://github.com/iancoleman/cia_world_factbook_api
                </p>

                <span role="img" aria-label="small leafy tree branch"> 🌿 </span>

                <h2> Tech </h2>

                <p>
                    Made with React on the front, Node and Express on the back (this may change..), and Mongo as the DB.
                </p>

            </div>
        </div>
    );

}

export default InfoModal;