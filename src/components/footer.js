import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="fixed-bottom bg-dark align-center justify-center">   
            <p style={{color:"white"}}>© 2021 CSE Group 38, Inc. · <Link to="#">About Us</Link>      ·<Link to="#">Help</Link></p>
        </footer>
    );
};

export default Footer;