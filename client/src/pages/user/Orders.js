import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid pt-2  dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 ">
            <h1 className="text-center  rounded-2 info text-white">
              All Orders
            </h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container mb-2 ">
                    {o?.products?.map((p, i) => (
                      <div
                        className="row mb-2 p-3 border-card card flex-row"
                        key={p._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top mb-4"
                            alt={p.name}
                            style={{ minHeight: "18rem", minWidth: "35vh" }}
                          />
                        </div>
                        <div className="col-md-8 fs-5 fw-light">
                          <p>Name: {p.name.substring(0, 40)}...</p>
                          <hr />
                          <p>
                            Description: {p.description.substring(0, 40)}...
                          </p>
                          <hr />
                          <p>Price : ₹{p.price}</p>
                        </div>
                        <hr className="width" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
