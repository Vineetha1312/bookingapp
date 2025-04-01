import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");

  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : error ? (
        "Error loading data. Please try again later."
      ) : (
        <div className="fpList">
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              {/* Display the first photo from the photos array */}
              <img
                src={item.photos[0]}
                alt={item.name}
                className="fpImg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300"; // Fallback image if the URL is broken
                }}
              />
              <div className="fpDetails">
                <span className="fpName"> {item.name}</span>
                <span className="fpCity"> {item.city} </span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
