import React, { useContext } from "react";
import { LoadingContext } from "../../App";
import './loading.css'

const Loading = () => {
  const isLoading = useContext(LoadingContext)
  return (
    isLoading ?  <div className="bars-container">
      <div className="bars"></div>
    </div> : undefined
  );
};

export default Loading;
