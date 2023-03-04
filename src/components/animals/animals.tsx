import { useEffect, useState } from "react";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import { getAnimals } from "../../services/animalServices";
import { Animal } from "../animal/animal";
import './animals.scss'

export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimalSmall[]>([]);
  
    useEffect(() => {
      const getData = async () => {
        let animals = await getAnimals();
  
        setAnimals(animals);
      };
  
      if (animals.length > 0) return;
  
      getData();
    });
  
    let productsHtml = animals.map((animal) => {
      return (
        <Animal
          animal={animal}
          key={animal.id}
        ></Animal>
      );
    });
  
    return <div className="animals">{productsHtml}</div>;
  };
  