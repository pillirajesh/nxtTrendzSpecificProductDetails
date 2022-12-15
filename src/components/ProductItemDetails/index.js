// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

const status = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    count: 1,
    similarProducts: [],
    isLoading: true,
    isTrue: status.success,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  decreaseCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  increaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  goBackToProducts = () => {
    console.log(this.props)
    const {history} = this.props
    history.replace('/products')
  }

  getBadCredential = () => (
    <div className="bad-credential-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="fail-image"
      />
      <h1 className="bad-paragraph">Product Not Found</h1>
      <button
        className="shop-button"
        type="button"
        onClick={this.goBackToProducts}
      >
        Continue Shopping
      </button>
    </div>
  )

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}
    `
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        availability: fetchedData.availability,
        brand: fetchedData.brand,
        description: fetchedData.description,
        imageUrl: fetchedData.image_url,
        price: fetchedData.price,
        rating: fetchedData.rating,
        title: fetchedData.title,
        totalReviews: fetchedData.total_reviews,
      }
      const similarProduct = fetchedData.similar_products.map(eachProduct => ({
        id: eachProduct.id,
        availability: eachProduct.availability,
        brand: eachProduct.brand,
        description: eachProduct.description,
        imageUrl: eachProduct.image_url,
        price: eachProduct.price,
        rating: eachProduct.rating,
        totalReviews: eachProduct.total_reviews,
        style: eachProduct.style,
        title: eachProduct.title,
      }))
      console.log(fetchedData)

      this.setState({
        productDetails: updatedData,
        similarProducts: similarProduct,
        isLoading: false,
        isTrue: status.success,
      })
    } else {
      this.setState({isTrue: status.failure, productDetails: {}})
    }
  }

  getSuccessDetails = () => {
    const {productDetails, similarProducts, count, isLoading} = this.state

    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productDetails

    return (
      <div className="main-container">
        <Header />
        <div>
          {isLoading ? (
            <div className="loader">
              <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
            </div>
          ) : (
            <>
              <div className="image-container">
                <img src={imageUrl} alt="product" className="product-image" />
                <div className="text-container">
                  <h1 className="title">{title}</h1>
                  <p className="price">{`Rs ${price}/-`}</p>
                  <div className="ratings-container">
                    <div className="rating-container">
                      <p className="rating">{rating} </p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        className="star"
                        alt="star"
                      />
                    </div>
                    <p className="review">{totalReviews} Reviews</p>
                  </div>
                  <p className="description">{description}</p>
                  <p className="available">{`Available: ${availability}`}</p>
                  <p className="brand">{`Brand: ${brand}`}</p>
                  <hr />
                  <div className="button-container">
                    <button
                      className="count-button"
                      type="button"
                      onClick={this.decreaseCount}
                    >
                      <BsDashSquare className="bs-image" />
                    </button>
                    <p className="count">{count}</p>
                    <button
                      className="count-button"
                      type="button"
                      onClick={this.increaseCount}
                    >
                      <BsPlusSquare className="bs-image" />
                    </button>
                  </div>
                  <button className="add-cart-button" type="button">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="cont">
                <h1 className="similar-heading">Similar Products</h1>
                <ul className="similar-un-order-list">
                  {similarProducts.map(eachSimilar => (
                    <SimilarProductItem
                      eachSimilarProductDetails={eachSimilar}
                      key={eachSimilar.id}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {isTrue, productDetails} = this.state

    switch (isTrue) {
      case status.success:
        if (productDetails.length !== 0) {
          return this.getSuccessDetails()
        }
        return this.getBadCredential()
      default:
        return this.getBadCredential()
    }
  }
}

export default ProductItemDetails
