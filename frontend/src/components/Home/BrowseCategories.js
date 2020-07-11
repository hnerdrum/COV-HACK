import React from 'react';

const BrowseCategories = () => {

  const clickRegister = () => {
    window.location.assign( "/register");
  };

  const allCategories = ['Ferrous', 'Non-ferrous', 'Aluminium', 'Steel', 'Example',
    'Ferrous', 'Non-ferrous', 'Aluminium', 'Steel', 'Example',
    'Ferrous', 'Non-ferrous', 'Aluminium', 'Steel', 'Example',
    'Ferrous', 'Non-ferrous', 'Aluminium', 'Steel', 'Example',
    'Ferrous', 'Non-ferrous', 'Aluminium', 'Steel', 'Example',
    ];


    const categroiesToShow = 
    <div>
        {allCategories.map(x => {
        return (
            <div className="popularCategory">
                <h5 className="shallow">{x}</h5>
            </div>
        )
    })}
    </div>

  return (
    <div className="section-top-border">
        <div className="container marginTop15">
            <h3 className="shallow">Or browse through our most popular categroies...</h3>
            {categroiesToShow}
        </div>
    </div>
  )
}

export default BrowseCategories;
