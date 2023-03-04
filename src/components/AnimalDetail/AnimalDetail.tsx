import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { IAnimalUpdate } from "../../models/IAnimalUpdate";
import { getAnimalById, updateAnimal } from "../../services/animalServices";
import "./AnimalDetail.scss";

export const AnimalDetails = () => {
  const [animal, setAnimal] = useState<IAnimal>();
  const [isFed, setIsFed] = useState(false);
  const [buttonText, setButtonText] = useState('Mata mig')
  const [isDisabled, setIsDisabled] = useState(false)
  const [fedTime, setFedTime] = useState("");
  const [shouldFeed, setShouldFeed] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const animal = await getAnimalById(+id);
        setAnimal(animal);
        setIsFed(animal.isFed);
        if (animal.isFed) {
          setFedTime(animal.fedTime);
          setIsDisabled(true);
          checkFedTime(animal.fedTime);
        } else {
          setShouldFeed(true);
        }
      }
    };
  
    getData();
  }, [id]);

  const checkFedTime = (fedTime: string) => {
    const now = new Date().getTime();
    const lastFedTime = new Date(fedTime).getTime();
    const timeDiff = now - lastFedTime;
    const hoursDiff = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    if (hoursDiff >= 3) {
      setIsFed(false);
      setFedTime("");
      setIsDisabled(false);
      setShouldFeed(true);
    } else {
      setShouldFeed(false);
      const diff = (3 - hoursDiff) * 60;
      setTimeout(() => {
        setIsFed(false);
        setFedTime("");
        setIsDisabled(false);
        setShouldFeed(true);
      }, diff * 1000);
    }
  }

  const feedAnimal = async () => {
    const fedTimeStored = localStorage.getItem(`fedTime-${animal?.id}`);
    const now = new Date().getTime();
    if (fedTimeStored && now - parseInt(fedTimeStored) < 3 * 60 * 60 * 1000) {
      setButtonText("Djuret matades nyligen");
      setIsDisabled(true);
      return;
    }
  
    const currentTime = new Date().toLocaleString();
    setFedTime(currentTime);
    setIsFed(true);
    setIsDisabled(true);
    setButtonText("Djuret matat");
  
    const updatedAnimal: IAnimalUpdate = {
      ...animal!,
      isFed: true,
      fedTime: currentTime,
      id: animal?.id ?? 0,
    };
  
    await updateAnimal(updatedAnimal);
  
    localStorage.setItem(`fedTime-${animal?.id}`, now.toString());
  };
  
  return (
    <div className="animal__container">
      <h3 className="animal__container--name">{animal?.name}</h3>
      <p className="animal__container--description">{animal?.longDescription}</p>
      <img className="animal__container--image" src={animal?.imageUrl} alt={animal?.name} />
      {isFed ? 
        <p className="animal__container--status">matad {fedTime}</p>
        :
        <p className="animal__container--status">Inte matad</p>
      }

      {shouldFeed && 
        <p className="animal__container--feed-notification"></p>
      }

      <button onClick={feedAnimal} disabled={isDisabled}>
        {buttonText}
      </button>
    </div>
  );
};
