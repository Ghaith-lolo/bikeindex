import Bikes from "./bikes/Bikes";
import { useState, useEffect, ChangeEvent } from 'react';
import axiosInstance from '../../axiosInstance';
import { Button, Input } from 'antd';
import './SearchBikes.css';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


function SearchBikes() {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<string>(`${localStorage.getItem('location') ? localStorage.getItem('location') : 'IP'}`);
    const [stolenness, setStolenness] = useState<string>(`${localStorage.getItem('stolenness') ? localStorage.getItem('stolenness') : 'all'}`);
    const [current, setCurrent] = useState<number>(
        localStorage.getItem('perPage')
            ? Number(localStorage.getItem('perPage'))
            : 1
    );
    const [totalTheftCases, settotalTheftCases] = useState(0);
    const [titleToBeSearch, setTitleToBeSearch] = useState('');
    const [title, setTitle] = useState('');


    const getMunichBikes = () => {
        setLocation('Munich');
        setStolenness('proximity');
        localStorage.setItem('stolenness', 'proximity')
        localStorage.setItem('location', 'Munich')
    };
    const getAllBikes = () => {
        setStolenness('all');
        setLocation('IP');
        localStorage.setItem('stolenness', 'all')
        localStorage.setItem('location', 'IP')

    };
    useEffect(() => {
        setStolenness(`${localStorage.getItem('stolenness')}`);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(`/api/v3/search?page=${current}&per_page=10&query=${title}&location=${location}&distance=10&stolenness=${stolenness}`);
                const countResponse = await axiosInstance.get(`/api/v3/search/count?location=${location}&distance=10&stolenness=${stolenness}`);
                settotalTheftCases(countResponse.data.stolen);
                setData(response.data.bikes);
                setError(null);
            } catch (err) {
                setError('Error fetching bike data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location, stolenness, current, title]);

    if (error) {
        return <div>{error}</div>;
    }


    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        localStorage.setItem('perPage', `${page}`)
    };

    const getTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleToBeSearch(event.target.value);
    };

    const filterSearch = () => {
        setTitle(titleToBeSearch);
    };

    return (
        <>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '100px'
                }}>
                    <span style={{ width: '65%' }}>
                        <p><b>total number of bike theft cases :</b>{totalTheftCases}</p>
                        <div>
                            <Input placeholder="Title Filter" value={titleToBeSearch} onChange={getTitle} style={{ margin: '10px 0px' }} />
                        </div>
                        <Button type="primary" onClick={filterSearch} icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </span>

                </div>
                <div className="filter">
                    <Button type="text" className={stolenness === 'proximity' ? 'active' : ''} onClick={getMunichBikes}>bike thefts for the Munich area</Button> |
                    <Button type="text" className={stolenness !== 'proximity' ? 'active' : ''} onClick={getAllBikes} >All</Button>
                </div>

            </div>
            {isLoading ? (
                <div className='messages'>Loading...</div>
            ) : (
                data && data.length > 0 ? (
                    data.map((bike) => (
                        <Bikes key={bike.id} bike={bike} />
                    ))
                ) : (
                    <div className='messages'>No bikes found.</div>
                )
            )}
            <div style={{ margin: "20px auto", textAlign: "center" }}>
                <Pagination current={current} showSizeChanger={false}
                    pageSize={10} onChange={onChange} total={totalTheftCases} />
            </div>
        </>
    );
}

export default SearchBikes;