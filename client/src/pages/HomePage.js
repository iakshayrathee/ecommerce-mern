import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <marquee
          width="60%"
          direction="left"
          height="40vh"
          behavior="scroll"
          scrollamount="20"
          className="hero text-white w-100 fs-5"
        >
          SUMMER SAVINGS SPLASH! Get all shirts under ₹699!
        </marquee>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          <SwiperSlide className="img-2">
            <img
              src="https://images.ctfassets.net/rxqefefl3t5b/6I2vL9f0IVsDQ8qFgdrxH7/7660c4bab3116a4a04025d5c4802efa5/Virgin-Red-online-shopping-offers.jpg?fl=progressive&q=80"
              alt="Slide "
            />
            <h1 className="text-white text-banner-3">
              Time to <br /> refresh your <br />
              Wardrobe
            </h1>
            <button
              className="button-banner-2 button-2 rounded-3 p-2  border-1"
              onClick={() => navigate("/categories")}
            >
              Explore More
            </button>
          </SwiperSlide>

          <SwiperSlide className="img-3">
            <img
              src="https://cdn.create.vista.com/api/media/medium/412591868/stock-photo-happy-man-shirt-holding-shopping-bags-blue?token="
              alt="Slide 3"
            />
            <h1 className="text-white text-banner-2">
              One-stop <br /> shop <br /> find it all <br /> here!
            </h1>
            <button
              className="button-banner-3 button-3 rounded-3 p-2  border-1"
              onClick={() => navigate("/categories")}
            >
              Shop Now
            </button>
          </SwiperSlide>
          <SwiperSlide className="img-1">
            <img
              src="https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2022/05/Malls-in-Mumbai.jpg?fit=1000%2C678&ssl=1"
              alt="Slide 1"
            />
            <h1 className="text-white text-banner">
              Reflect who <br /> you are <br /> with <br /> our collections
            </h1>
            <button
              className="button-banner button-1 rounded-3 p-2  border-1"
              onClick={() => navigate("/categories")}
            >
              Shop Now
            </button>
          </SwiperSlide>
        </Swiper>
        <div className="container-fluid row mt-3  home-page">
          <div className="col-md-3 filters ">
            <div className="border ">
              <h3 className="text-center text text-uppercase">Filters</h3>
              <h4 className="text-center category-responsive mt-5">Category</h4>
              <div className="d-flex flex-column ">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/* price filter */}
              <h4 className="text-center mt-4">Price</h4>
              <div className="d-flex flex-column ">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 main">
            <h1 className="text-center title-fix">All Products</h1>
            <div className="d-flex flex-wrap ms-5 ">
              {products?.map((p) => (
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
                          {p.name.substring(0, 20)}...
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

                    <div className="card-name-price responsive">
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
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
