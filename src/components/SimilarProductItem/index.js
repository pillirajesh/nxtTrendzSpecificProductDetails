// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachSimilarProductDetails} = props
  const {imageUrl, title, rating, price, brand} = eachSimilarProductDetails

  return (
    <li className="similar-list">
      <img src={imageUrl} alt="similar product" className="similar-image" />
      <p className="title-name">{title}</p>
      <p className="brand-name">by {brand}</p>
      <div className="similar-cont">
        <p className="price-name">Rs {price}</p>
        <div className="rating-cont">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
