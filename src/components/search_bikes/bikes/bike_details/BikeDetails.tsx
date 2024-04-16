import { useEffect, useState } from 'react';
import axiosInstance from '../../../../axiosInstance';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface Bike {
  serial: string;
  manufacturer_name: string;
  frame_colors: string[];
  date_stolen: number;
  stolen_location: string;
  stolen_coordinates?: [number, number];
}

const Container = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const BikeDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Bike = styled.p`
  b {
    font-weight: bold;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

function BikeDetails() {
  const { id } = useParams();
  const [bike, setBike] = useState<Bike | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ bike: Bike }>(`/api/v3/bikes/${id}`);
        setBike(response.data.bike);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching bike data:', err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Title>Bike Details</Title>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : bike ? (
        <BikeDetailsContainer>
          <Bike><b>Serial:</b> {bike.serial}</Bike>
          <Bike><b>Manufacturer:</b> {bike.manufacturer_name}</Bike>
          <Bike><b>Primary Colors:</b> {bike.frame_colors.join(', ')}</Bike>
          <Bike><b>Stolen on:</b> {new Date(bike.date_stolen * 1000).toLocaleString()}</Bike>
          <Bike><b>Stolen from:</b> {bike.stolen_location}</Bike>
          {bike.stolen_coordinates && (
            <>
              <Bike><b>Latitude:</b> {bike.stolen_coordinates[0]}</Bike>
              <Bike><b>Longitude:</b> {bike.stolen_coordinates[1]}</Bike>
            </>
          )}
        </BikeDetailsContainer>
      ) : (
        <Loader>No bike data available</Loader>
      )}
    </Container>
  );
}

export default BikeDetails;