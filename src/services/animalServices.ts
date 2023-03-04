import axios from "axios";
import { IAnimalSmall } from "../models/IAnimalSmall";
import { IAnimal } from "../models/IAnimal";

export const getAnimals = async (): Promise<IAnimalSmall[]> => {
  let response = await axios.get<IAnimalSmall[]>(
    "https://animals.azurewebsites.net/api/animals"
  );

  return response.data;
};

export const getAnimalById = async (id: number): Promise<IAnimal> => {
  let response = await axios.get<IAnimal>(
    `https://animals.azurewebsites.net/api/animals/${id}`
  );

  return response.data;
};

export const updateAnimal = async (animal: IAnimal): Promise<IAnimal> => {
  const response = await axios.put<IAnimal>(
    `https://animals.azurewebsites.net/api/animals/${animal.id}`,
    animal
  );

  return response.data;
};
