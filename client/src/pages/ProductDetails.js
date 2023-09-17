import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/ProductDetailsStyles.css";
import { colors } from "colors";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ClipLoader
          color="#36d5d6"
          className="loader"
          loading={loading}
          size={50}
        />
      ) : (
        <Layout>
          <div className=" d-flex flex-row row container product-details">
            <div className="col-md-6">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top vertical"
                alt={product.name}
              />
            </div>
            <div className="col-md-6 product-details-info">
              <h1 className="text-center fw-bold mb-1">Product Details</h1>
              <hr />
              <h5>Name : {product.name}</h5>
              <h5>Description : {product.description}</h5>
              <h5>
                Price : &nbsp;
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h5>
              <h5>Category : {product?.category?.name}</h5>
              <button className="btn button " onClick={() => navigate("/cart")}>
                GO TO CART
              </button>
            </div>
          </div>
          <hr />
          <div className="row container similar-products">
            <div className="similar text-center ">
              <h3>Similar Products</h3>
            </div>
            {relatedProducts.length < 1 && (
              <p className="text-center">No Similar Products found</p>
            )}
            <div className="d-flex flex-wrap m-5">
              {relatedProducts?.map((p) => (
                <div className="home-page">
                  <div className="card m-2" key={p._id}>
                    <div className="overflow">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-name-price">
                        <div className="row">
                          <h5 className="card-title fw-light">
                            {p.name.substring(0, 25)}..
                          </h5>
                          <h5 className="card-title card-price">
                            {p.price.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </h5>
                        </div>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>

                      <div className="card-name-price">
                        <button
                          className="btn color text-white ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokewidth="{1.5}"
                            stroke="currentColor"
                            classname="w-6 h-6"
                          >
                            <path
                              strokelinecap="round"
                              strokelinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokelinecap="round"
                              strokelinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          View Product
                        </button>
                        <button
                          className="btn color-1 text-white ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProductDetails;
