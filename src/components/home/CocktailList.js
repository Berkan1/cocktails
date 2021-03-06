import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/App.scss';
import NoneFound from './NoneFound';

function CocktailList(props) {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    if (props.searchByLetter){
      Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${props.letter}`).then(res => {
			  if(res.data.drinks) {
			  	setCocktails(res.data.drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink)));
			  }
			  else {
			  	setCocktails([]);
			  }
      });
    }
    else {
      Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${props.search}`).then(res => {
			  if (res.data.drinks) {
			  	setCocktails(res.data.drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink)));
			  }
			  else {
			  	setCocktails([]);
			  }
      });
    }
  }, [props.letter, props.search, props.searchByLetter]);
  
  if (cocktails.length > 0){
    return (
      <div className="center"> 
        
        {cocktails.map(cocktail => 
          <Cocktail 
            letter={props.letter}
            search = {props.search}
            usingLetter={props.searchByLetter}
            key={cocktail.idDrink} 
            id={cocktail.idDrink} 
            name={cocktail.strDrink} 
            image={cocktail.strDrinkThumb}
          />
        )}
      </div>
    );
  }	
  else {
    return (
      <NoneFound />
    );
  }
}

function Cocktail(props) {
  return (
    <NavLink to={{
      pathname: `/${props.id}`,
      usedLetter: props.letter,
      usedSearch: props.search,
      wasLetterUsed: props.usingLetter
    }}>
      <figure className="zoom">
        <Image 
          src={props.image}
          alt={props.name} 
          width="200" 
          thumbnail
        />
        <figcaption>{props.name}</figcaption>
      </figure>
    </NavLink>
  );
}

export default CocktailList;