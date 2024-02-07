import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
const ContinueCard = ({ data }) => {
    const { heading, description, icon } = data
    return (
        <Card className='flex flex-col justify-between'>
            <div className="mt-5">
                <div className="flex justify-center items-center">
                    <img src={icon} alt="icon" />
                </div>

                <CardHeader>
                    <CardTitle className='text-lg font-semibold text-[#003780] text-center'>{heading}</CardTitle>
                </CardHeader>
                <CardContent className='text-xs leading-relaxed text-center'>
                    {description}
                </CardContent>
            </div>
            <CardFooter>
                <Button variant='outline' className='w-full rounded-3xl py-2'>
                    Continue
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ContinueCard