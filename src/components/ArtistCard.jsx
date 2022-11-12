import { useNavigate } from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate= useNavigate();


  return(
    <div className="flex flex-col w-[250px] p-5 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={()=>navigate(`/artists/${track?.artists[0].adamid}`)}>
      <img alt="Artist" src={track?.images?.coverart} className="w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg truncate text-black">{track?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;
