import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import icon1 from './../assets/con-card-1.svg'
import icon2 from './../assets/con-card-2.svg'
import icon3 from './../assets/con-card-3.svg'
import icon4 from './../assets/con-card-4.svg'
const icons = {
    icon1: icon1,
    icon2: icon2,
    icon3: icon3,
    icon4: icon4
}
import { Button } from "./ui/button"
const ContinueCard = ({ data, handleContinueMethod }) => {
    const { heading, description, icon, action } = data
    return (
        <Card className='flex flex-col justify-between'>
            <div className="mt-5">
                <div className="flex justify-center items-center">
                    <img src={icons[icon]} alt="icon" />
                </div>

                <CardHeader>
                    <CardTitle className='text-lg font-semibold text-[#003780] text-center'>{heading}</CardTitle>
                </CardHeader>
                <CardContent className='text-xs leading-relaxed text-center'>
                    {description}
                </CardContent>
            </div>
            <CardFooter>
                <Button
                    onClick={() => handleContinueMethod(action)}
                    variant='outline' className='w-full rounded-3xl py-2'>
                    Continue
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ContinueCard