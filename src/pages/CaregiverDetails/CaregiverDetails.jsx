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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    salutation: z.enum(["mister", "woman"], {
        required_error: "You need to select a notification type.",
    }),
    firstName: z.string().nonempty({ message: "First name is required." }),
    lastName: z.string().nonempty({ message: "Last name is required." }),
    street: z.string().nonempty({ message: "Street is required." }),
    zip: z.string().nonempty({ message: "Zip is required." }),
    city: z.string().nonempty({ message: "City is required." }),
    telephone: z.string().nonempty({ message: "Telephone is required." }),
    email: z.string().nonempty({ message: "Email is required." }),

})
import { useTranslation } from "react-i18next"
export default function CaregiverDetails() {
    const { t } = useTranslation()
    const { caregiverDetails } = t("specify-data")
    const { personalInfo, firstName, lastName, street, postCode, city, heading1, telephoneNumber, email, button } = caregiverDetails
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: localStorage.getItem('caregiverDetails') ? JSON.parse(localStorage.getItem('caregiverDetails')) : {}
    })

    async function onSubmit(data) {
        console.log(data)
        localStorage.setItem('caregiverDetails', JSON.stringify(data))
        const formData = {
            sessionId: localStorage.getItem('sessionId'),
            carePersonForm: {
                ...data
            }
        }
        const res = await orderPlace(formData)
        console.log('res', res);
        if (res.sessionId) {
            navigate('/delivery-options')
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="salutation"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className='text-2xl text-[#003780]'>{personalInfo?.label}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="mister" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {personalInfo?.value1}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="woman" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {personalInfo?.value2}
                                        </FormLabel>
                                    </FormItem>

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{firstName?.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={firstName?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{lastName?.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={lastName?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{street?.label}*</FormLabel>
                            <FormControl>
                                <Input placeholder={street?.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{postCode?.label} *</FormLabel>
                                <FormControl>
                                    <Input placeholder={postCode?.placeholder} {...field} />
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
                                <FormLabel>{city?.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={city?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <h2 className='text-2xl text-[#003780]'>{heading1}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{telephoneNumber?.label} *</FormLabel>
                                <FormControl>
                                    <Input placeholder={telephoneNumber?.placeholder} {...field} />
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
                                <FormLabel>{email?.label} *</FormLabel>
                                <FormControl>
                                    <Input placeholder={email?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form>
    )
}
