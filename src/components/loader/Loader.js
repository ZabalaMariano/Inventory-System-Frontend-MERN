import React from 'react';
import loaderImage from '../../assets/loader.gif';
import ReactDOM from 'react-dom';
import './Loader.scss';

export default function Loader() {
  const jsx = (
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImage} alt="Loader" />
      </div>
    </div>
  );

  return ReactDOM.createPortal(jsx, document.getElementById('loader'));
}

export const SpinnerImage = () => {
  return (
    <div className="--center-all">
      <img src={loaderImage} alt="Loader" />
    </div>
  );
};
