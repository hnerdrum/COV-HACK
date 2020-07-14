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


    const categoriesToShow =
    <div>
        {allCategories.map((x, i) => {
        return (
            <div key={i} className="popularCategory">
                <h5 className="shallow">{x}</h5>
            </div>
        )
    })}
    </div>;

  return (
    <div className="section-top-border">
        <div className="container marginTop15">
            <h3 className="shallow">Or browse through our most popular categories...</h3>
            {categoriesToShow}
        </div>
    </div>
  )
};

export default BrowseCategories;
