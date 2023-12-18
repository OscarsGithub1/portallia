import React from 'react';
import Image1 from '../assets/images/footer-icon-01.png';
import Image2 from '../assets/images/footer-icon-02.png';
import Image3 from '../assets/images/footer-icon-03.png';




const MyFooter = () => {
  return (
    <body>
      <div>
        <footer className="footer-main bg-light fixed-bottom">
            <div className="container">
            <div className="row address-main">
                <div className="col-lg-4 col-sm-12 col-xs-12">
                <div className="address-box clearfix">
                    <div className="add-icon">
                    <img src={Image1} alt="image1" />
                    </div>
                    <div className="add-content">
                    <h5>Adress</h5>
                    <p>
                        Torshamngatan 35, 164 40 Kista
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-xs-12">
                <div className="address-box clearfix">
                    <div className="add-icon">
                    <img src={Image2} alt="image2" />
                    </div>
                    <div className="add-content">
                    <h5>Telefon</h5>
                    <p>
                        010-585 48 65
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 col-sm-12 col-xs-12">
                <div className="address-box clearfix">
                    <div className="add-icon">
                    <img src={Image3} alt="image3" />
                    </div>
                    <div className="add-content">
                    <h5>Email</h5>
                    <p>
                        <a href="mailto:" style={{ textDecoration: 'none' }}>
                        info@meone.se
                        </a>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </footer>
      </div>
    </body>
  );
};

export default MyFooter;
