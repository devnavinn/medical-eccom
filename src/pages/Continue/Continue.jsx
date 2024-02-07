import ContinueCard from './../../components/ContinueCard'
import { countinue } from "../../constants"

const Countinue = () => {
    return (
        <div className='grid grid-cols-2 gap-5 mt-5'>
            {
                countinue.map((item, index) => (
                    <ContinueCard key={index} data={item} />
                ))
            }
        </div>
    )
}

export default Countinue