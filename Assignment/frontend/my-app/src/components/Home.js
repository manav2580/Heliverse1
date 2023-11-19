import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, listUsersSearch } from "../actions/userAction";

const Navbar = ({search, setSearch}) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </li>
            </ul>
            <form className="d-flex" data-bs-theme="light">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

const Home = () => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [start, setStart] = React.useState(0);
    const [end, setEnd] = React.useState(10);
    const [search, setSearch] = React.useState("");

  useEffect(() => {
    dispatch(listUsersSearch(search, page));
  }, [search, page]);

  return (
    <React.Fragment>
      <Navbar search={search} setSearch={setSearch} />
      <div className="content">
        <div className="container">
          <div className="row">
            {users?.users?.map((user) => {
              return (
                <div className="col-lg-4">
                  <div className="text-center card-box">
                    <div className="member-card pt-2 pb-2">
                      <div className="thumb-lg member-thumb mx-auto">
                        <img
                          src={user?.avatar}
                          className="rounded-circle img-thumbnail"
                          alt="profile-image"
                        />
                      </div>
                      <div className="">
                        <h4>{user?.first_name} {user?.last_name}</h4>
                        <p className="text-muted">
                          {user?.domain} <span>| </span>
                          <span>
                            <a href={`mailto:${user?.email}`} className="text-pink">
                              {user?.email}
                            </a>
                          </span>
                        </p>
                      </div>
                      <ul className="social-links list-inline">
                        <li className="list-inline-item">
                          <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Facebook"
                          >
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Twitter"
                          >
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            title=""
                            data-placement="top"
                            data-toggle="tooltip"
                            className="tooltips"
                            href=""
                            data-original-title="Skype"
                          >
                            <i className="fa fa-skype"></i>
                          </a>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                      >
                        {user?.available ? "Available" : "Not Available"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="row">
            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>Joseph M. Rohr</h4>
                    <p className="text-muted">
                      @Webdesigner <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>7845</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>1254</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>5846</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>Mark K. Horne</h4>
                    <p className="text-muted">
                      @Director <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>4851</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>10250</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>895</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>James M. Fonville</h4>
                    <p className="text-muted">
                      @Manager <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>4560</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>12350</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>742</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>Jade M. Walker</h4>
                    <p className="text-muted">
                      @Webdeveloper <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>3520</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>4587</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>423</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>Mathias L. Lassen</h4>
                    <p className="text-muted">
                      @Webdesigner <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>7851</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>10020</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>1036</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="">
                    <h4>Alfred M. Bach</h4>
                    <p className="text-muted">
                      @Manager <span>| </span>
                      <span>
                        <a href="#" className="text-pink">
                          websitename.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <ul className="social-links list-inline">
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Twitter"
                      >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        title=""
                        data-placement="top"
                        data-toggle="tooltip"
                        className="tooltips"
                        href=""
                        data-original-title="Skype"
                      >
                        <i className="fa fa-skype"></i>
                      </a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    Message Now
                  </button>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>7421</h4>
                          <p className="mb-0 text-muted">Wallets Balance</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>14754</h4>
                          <p className="mb-0 text-muted">Income amounts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>11525</h4>
                          <p className="mb-0 text-muted">Total Transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           */}
           <div className="row ">
            <div className="col-12 mx-auto">
              <div className="text-right">
                <ul className="pagination pagination-split mt-0">
                  <li className="page-item mr-3">
                    <button onClick={()=>{
                            setPage(page > 1 ? page-1 : page);
                            if(page < start+2){
                                setStart(start-10);
                                setEnd(end-10);
                            }
                        }} className="page-link" aria-label="Previous">
                      <span aria-hidden="true">«</span>{" "}
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
                  {start >= 10 && <li className={`page-item`}>
                        <button onClick={()=>{
                            setStart(start-10);
                            setEnd(end-10);
                        }} className="page-link">
                            ...
                        </button>
                    </li>}
                  {
                    Array.from({length:users?.pages},(_,i)=>i+1)?.slice(start,end).map((item)=>{
                        return <li className={`page-item ${item === page ? "active" : ""}`}>
                        <button onClick={()=>{
                            setPage(item);
                        }} className="page-link">
                            {item}
                        </button>
                        </li>
                    })
                  }
                  {end <= users?.pages -10 && <li className={`page-item`}>
                        <button onClick={()=>{
                            setStart(start+10);
                            setEnd(end+10);
                        }} className="page-link">
                            ...
                        </button>
                    </li>}
                  <li className="page-item">
                    <button onClick={()=>{
                            setPage(page < users?.pages ? page+1 : page);
                            if(page >= end){
                                setStart(start+10);
                                setEnd(end+10);
                            }
                        }} className="page-link" aria-label="Next">
                      <span aria-hidden="true">»</span>{" "}
                      <span className="sr-only">Next</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
