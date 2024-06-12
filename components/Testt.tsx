'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testt = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://directus-lwgwggg.141.98.152.246.sslip.io/items/products');
                setProducts(response.data);
                console.log('rayen',response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <div>
            
        </div>
    );
}

export default Testt;
