// frontend/src/components/SpotList.jsx
import surfSpots from "../data/surfSpots";
import InstagramEmbed from "./InstagramEmbed";

export default function SpotList() {
  return (
    <div>
      {surfSpots.map((spot) => (
        <div key={spot.name}>
          <h2>{spot.name}</h2>
          <p><strong>Location:</strong> {spot.location}</p>
          <p><strong>Country:</strong> {spot.country}</p>
          <p>{spot.description}</p>
          {spot.embedUrl && (
            <InstagramEmbed url={spot.embedUrl} caption={true} />
          )}
        </div>
      ))}
    </div>
  );
}
