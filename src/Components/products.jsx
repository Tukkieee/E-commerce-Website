import { SizeButton } from "./SizeButton";
import { useEffect, useState,useContext } from "react";
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { FiShoppingCart, FiPhone } from "react-icons/fi";

export const Products = () => {
    const { cart, addToCart } = useContext(AppContext)

    const images = [
        { id: '1', imageName: 'dress10.png', name: 'Dress10', size: 'M', price: 4000 },
        { id: '2', imageName: 'dress2.png', name: 'Dress2', size: 'S', price: 4000 },
        { id: '3', imageName: 'dress14.png', name: 'Dress14', size: 'L', price: 5000 },
        { id: '4', imageName: 'dress8.png', name: 'Dress8', size: 'M', price: 5000 },
        { id: '5', imageName: 'dress5.png', name: 'Dress5', size: 'XS', price: 3000 },
        { id: '6', imageName: 'dress6.png', name: 'Dress6', size: 'XS', price: 7000 },
        { id: '7', imageName: 'dress7.png', name: 'Dress7', size: 'S', price: 6000 },
        { id: '8', imageName: 'dress4.png', name: 'Dress4', size: 'XS', price: 10000 },
        { id: '9', imageName: 'dress9.png', name: 'Dress9', size: 'S', price: 5000 },
        { id: '10', imageName: 'dress1.png', name: 'Dress1', size: 'S', price: 8000 },
        { id: '11', imageName: 'dress11.png', name: 'Dress11', size: 'M', price: 12000 },
        { id: '12', imageName: 'dress12.png', name: 'Dress12', size: 'L', price: 6000 },
        { id: '13', imageName: 'dress13.png', name: 'Dress13', size: 'M', price: 5000 },
        { id: '14', imageName: 'dress3.png', name: 'Dress3', size: 'XS', price: 7000 },
        { id: '15', imageName: 'dress17.png', name: 'Dress15', size: 'L', price: 8000 },
        { id: '16', imageName: 'dress16.png', name: 'Dress16', size: 'L', price: 4000 }
    ];

    const [size, setSize] = useState('ALL');
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        size === "ALL" ? setFilteredImages(images) : setFilteredImages(images.filter(image => image.size === size))
    }, [size])



    return (
        <>
            <div className="main-nav">
                <div className='nav' >
                    <div className='nav_phone_no'><FiPhone/>+(234)-906-0648-128</div>
                    <div className='nav_size'>
                        <SizeButton name="ALL" handleSizeTag={setSize} sizeActive={size === 'ALL' ? true : false} />
                        <SizeButton name="XS" handleSizeTag={setSize} sizeActive={size === 'XS' ? true : false} />
                        <SizeButton name="S" handleSizeTag={setSize} sizeActive={size === 'S' ? true : false} />
                        <SizeButton name="M" handleSizeTag={setSize} sizeActive={size === 'M' ? true : false} />
                        <SizeButton name="L" handleSizeTag={setSize} sizeActive={size === 'L' ? true : false} />
                    </div>
                    <div className='cart'>
                        <Link className="link" to='/cart'>
                            <span><FiShoppingCart /></span>
                            <span className='circle'>
                                {cart}
                            </span>
                        </Link>


                    </div>
                </div>
            </div>
            <div className='body'>
                <div className='section'>
                    <div className='img_container'>
                        {filteredImages.map((image) => <div key={image.id} className='image-card'>
                            <div className='img-card'>
                                <img className='image' src={`/images/${image.imageName}`} alt='' />
                            </div>
                            <div className='price'>
                                <div className="h2"><h2>{image.name}</h2></div>
                                <h1>N{image.price}</h1>
                            </div>
                            <button className='btn' onClick={() => addToCart(image)}>Add to Cart</button>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}
