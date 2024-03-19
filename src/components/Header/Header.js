import clouds from '../../assets/clouds.mp4';
import Input from './Input';

export default function Header() {
    return (
        <div className='header'>
            <video autoPlay loop muted>
                <source src={clouds} type="video/mp4" />
            </video>
            <Input />
        </div>
    )
}
