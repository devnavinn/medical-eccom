"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { orderPlace } from "../../api/api"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
const FormSchema = z.object({
    email: z.string().nonempty({ message: "Email is required." }),
    switchToCurabox: z.boolean(),
    deliveryStart: z.string().nonempty({ message: "Delivery start is required." }),
})

export default function DeliveryOptions() {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: sessionStorage.getItem('deliveryOptions') ? JSON.parse(sessionStorage.getItem('deliveryOptions')) : {}
    })

    async function onSubmit(data) {
        console.log('data', data);
        sessionStorage.setItem('deliveryOptions', JSON.stringify(data))
        const formData = {
            sessionId: sessionStorage.getItem('sessionId'),
            deliveryOptionsForm: {
                ...data
            }
        }
        const res = await orderPlace(formData)
        if (res.sessionId) {
            navigate('/complete-application')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <h3 className="text-2xl text-[#003780] mt-5">Where should the curabox be delivered to?</h3>
                <FormField
                    control={form.control}
                    name="reciepient"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select recipient</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select recipient" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="To the insured person">To the insured person</SelectItem>
                                    <SelectItem value="To the Caregiver">To the Caregiver</SelectItem>
                                    <SelectItem value="To a commissioned nursing service">To a commissioned nursing service</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-10">
                    <h3 className="text-2xl text-[#003780] mb-5">Information about changing supplier</h3>

                    <FormField
                        control={form.control}
                        name="switchToCurabox"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        I already receive care aids from another provider, but would like to be supplied by curabox in the future.
                                    </FormLabel>

                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="w-1/2 mt-5">
                        <FormField
                            control={form.control}
                            name="deliveryStart"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desired start of delivery *</FormLabel>
                                    <FormControl>
                                        <Input type='date'  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className='py-2 px-24 rounded-3xl bg-[#003780] text-white'>Continue to overview and signature</Button>
            </form>
        </Form>
    )
}
