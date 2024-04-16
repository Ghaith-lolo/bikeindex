
import { Button } from 'antd';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className='header' >
                <span>
                    <Link to="/">  <img style={{ width: '74px', height: '72px' }} src="https://bikeindex.org/assets/revised/logo-b5b90b10f3084a33e26097ffff6528ca15766eaeb008c5a6d0e242605ccad3b8.svg" alt="" >
                    </img></Link>
                </span>
                <span>
                    <Button type="text" style={{ color: 'white' }}><Link to="/bikes">SEARCH BICKES</Link> </Button>
                    <Button type="text" style={{ color: 'white' }}> BLOG</Button>
                </span>
            </div>
        </>
    )
}

export default Header
