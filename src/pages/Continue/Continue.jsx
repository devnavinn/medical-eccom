import ContinueCard from './../../components/ContinueCard'
import { countinue } from "../../constants"
import { useNavigate } from 'react-router-dom'
const Countinue = () => {
    const navigate = useNavigate()
    const handleContinueMethod = (method) => {
        if (method === 'complete-online') {
            console.log('complete-online')
            navigate('/your-details')
        }
    }
    return (
        <div className='grid grid-cols-2 gap-5 mt-5'>
            {
                countinue.map((item, index) => (
                    <ContinueCard key={index} data={item}
                        handleContinueMethod={handleContinueMethod}
                    />
                ))
            }
        </div>
    )
}

export default Countinue