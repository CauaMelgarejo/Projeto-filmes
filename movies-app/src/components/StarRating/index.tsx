import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import './index.scss'

export interface Props{
    rating:number
}
export default function StarRating(props:Props){
    const numStar = Math.round(props.rating/2)

    const fullStars = [];
    const emptyStar =[];

    for (let i =0; i < 5; i++){
        if(i < numStar){
            fullStars.push(i)
        }else{
            emptyStar.push(i)
        }
    }

    return(
        <div className="movie-rating">
            {fullStars.map(index =>
                <FaStar key={index}/>
            )}
            {emptyStar.map(index =>
                <FaRegStar key={index}/>
            )}
        </div>
    );
}  