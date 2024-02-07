"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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

})

function YourDetils() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data) {
        console.log(data)
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
                                    <Input placeholder="DD.MM.YYYY" {...field} />
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
                <Button type="submit" className='py-2 px-24 rounded-3xl bg-[#003780] text-white'>Continue in the application</Button>
            </form>
        </Form>
    )
}

export default YourDetils