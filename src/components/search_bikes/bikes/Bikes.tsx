import React, { memo } from 'react';
import './Bikes.css'
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Bike {
    date_stolen: number;
    description: string;
    frame_colors: string[];
    frame_model: string;
    id: number;
    is_stock_img: boolean;
    large_img: string;
    location_found: string;
    manufacturer_name: string;
    external_id: string;
    registry_name: string;
    registry_url: string;
    serial: string;
    status: string;
    stolen: boolean;
    stolen_coordinates: string;
    stolen_location: string;
    thumb: string;
    title: string;
    url: string;
    year: number;
    propulsion_type_slug: string;
    cycle_type_slug: string;
}

interface BikesProps {
    bike: Bike;
}

const Bikes = memo(({ bike }: BikesProps) => {
    const unixTimestamp = bike.date_stolen;
    const dateObject = new Date(unixTimestamp * 1000);
    const dateString = dateObject.toLocaleString();
    const navigate = useNavigate();

    const openDetails = () => {
      navigate(`/bike/${bike.id}`);
    };
    return (
        <div className='card-bike' onClick={openDetails}>
            <div>
                {bike.thumb &&
                    <img style={{ width: '200px' }} src={bike.thumb} alt={bike.title} />
                    ||
                    <img style={{ width: '200px' }} src="https://bikeindex.org/assets/revised/bike_photo_placeholder-ff15adbd9bf89e10bf3cd2cd6c4e85e5d1056e50463ae722822493624db72e56.svg" />
                }
            </div>

            <Flex gap="large" justify="space-between" style={{
                width: '50%',
                margin: '0px 20px',
                flexWrap: "wrap"
            }}>
                <span>
                    <h3>{bike.title}</h3>
                    <p>{bike.description}</p>
                    <p><b>Date of the theft:</b> {dateString}</p>
                    <p><b>Location of the theft :</b> {bike.stolen_location || 'not found'}</p>
                </span>

                {/* <span>
                    <p>Frame Colors: {bike.frame_colors.join(', ')}</p>
                    <p>Frame Model: {bike.frame_model}</p>
                    <p>Manufacturer: {bike.manufacturer_name}</p>
                    <p>Serial: {bike.serial}</p>
                    <p>Year: {bike.year}</p>
                    <a href={bike.url} target="_blank" rel="noopener noreferrer">
                        View Bike
                    </a>
                </span> */}

            </Flex>

        </div>
    );
});

export default Bikes;