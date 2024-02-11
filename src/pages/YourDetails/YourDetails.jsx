"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
const FormSchema = z.object({
    type: z.enum(["insured-person", "relative/caregiver"], {
        required_error: "You need to select a notification type.",
    }),
    gender: z.enum(["Mister", "Woman"], {
        required_error: "You need to select a notification type.",
    }),
    "first-name": z.string().nonempty({
        required_error: "First name is required.",
    }),
    "last-name": z.string().nonempty({
        required_error: "Last name is required.",
    }),
    "full-address": z.string().nonempty({
        required_error: "Full address is required.",
    }),
    "post-code": z.string().nonempty({
        required_error: "Post code is required.",
    }),
    city: z.string().nonempty({
        required_error: "City is required.",
    }),
    dob: z.string().nonempty({
        required_error: "Date of birth is required.",
    }),
    telephone: z.string().nonempty({
        required_error: "Telephone number is required.",
    }),
    email: z.string().nonempty({
        required_error: "Email is required.",
    }),
    insuredis: z.enum(["Statutory insured", "Privately insured"], {
        required_error: "You need to select a notification type.",
    }),
    "insurance-number": z.string().nonempty({
        required_error: "Insurance number is required.",
    }),
    "health-insurance": z.string().nonempty({
        required_error: "Health insurance is required.",
    }),
    "data-url": z.string().nonempty({
        required_error: "Data url is required.",
    }),
    dob_2: z.string().nonempty({
        required_error: "Date of birth is required.",
    }),
    "isagree": z.boolean().refine((value) => value === true, {
        message: "You need to agree to the terms and conditions.",
    }),


})

function YourDetils() {
    const [rating, setRating] = useState(0);
    const navigate = useNavigate()
    const handleRatingClick = (value) => {
        // Update the rating when a star is clicked
        setRating(value);
    };
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
        console.log(data)
        navigate('/caregiver-details')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="grid grid-cols-2 gap-5">

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>I am*</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="insured-person" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Insured person
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="relative/caregiver" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Relative/caregiver
                                            </FormLabel>
                                        </FormItem>

                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>Gender*</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Mister" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Mister
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Woman" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Woman
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="first-name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last-name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <FormField
                    control={form.control}
                    name="full-address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street, house number *</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="post-code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Post Code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Birth Date*</FormLabel>
                                <FormControl>
                                    <Input type='date' placeholder="DD.MM.YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="mt-24">
                    <h1 className="text-xl text-[#003780] font-semibold">Contact options for the insured person</h1>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                        <FormField
                            control={form.control}
                            name="telephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telephone Number*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+49 " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>

                    <FormField
                        control={form.control}
                        name="insuredis"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>Health insurance information</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-2"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Statutory insured" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Statutory insured (costs covered by the nursing care insurance fund)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Privately insured" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Privately insured
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-5 my-5">
                        <FormField
                            control={form.control}
                            name="insurance-number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Insurance Number*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insurance Number " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="health-insurance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Health insurance*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+49 " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p>Is the insured person eligible for assistance?</p>
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="data-url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-2xl text-[#003780]'>{`Don't have the data to hand?`}</FormLabel>
                                <p>If you do not currently have data, copy the link and save it. You can use the link to return to the application at a later date and continue with your application. All previous information will be called up again.</p>
                                <FormControl>
                                    <Input placeholder="Copy link" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-1/2">
                    <FormField
                        control={form.control}
                        name="dob_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-2xl text-[#003780]'>Information on the level of care</FormLabel>
                                <p>Birth date *</p>
                                <FormControl>
                                    <Input type='date' placeholder="DD.MM.YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col ">
                    <label>Level of care</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Controller
                                key={value}
                                name="rating"
                                control={form.control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Button
                                        variant="outline"
                                        className="w-12 h-10"
                                        onClick={() => field.onChange(value)}
                                        style={{
                                            color: field.value === value ? 'white' : 'gray',
                                            backgroundColor: field.value === value ? '#003780' : '',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {value}
                                    </Button>
                                )}
                            />

                        ))}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="isagree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2  rounded-lg border p-2">
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-readonly
                                />
                            </FormControl>
                            <div className="">
                                <FormLabel className="text-base">I would like to specify the carer or supervisor of the insured person.</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className='py-2 px-24 rounded-3xl bg-[#003780] text-white'>Continue in the application</Button>
            </form>
        </Form>
    )
}

export default YourDetils