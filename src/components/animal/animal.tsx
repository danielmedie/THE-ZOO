import { useNavigate } from "react-router-dom";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import './animal.scss'

interface IAnimalProps {
  animal: IAnimalSmall;
}

export const Animal = (props: IAnimalProps) => {

    const navigate = useNavigate();


    const showMoreClick = () => {
        navigate(`/animal/${props.animal.id}`);
      };    
  return (
    <>
      <div className="animal">
        <h4 className="animal--name">{props.animal.name}</h4>
        <div className= 'animal__image-container'>
        {props.animal.imageUrl ? (
          <img className= 'animal__image' src={props.animal.imageUrl} alt={props.animal.name}  />
        ) : (
          <img className= 'animal__image' src="" alt={props.animal.name} />
        )}
        </div>
        <h5 className= 'animal--description'>{props.animal.shortDescription}</h5>
        <button className= 'animal--moreBtn'onClick={showMoreClick}>Läs mer</button>
      </div>
    </>
  );
};
