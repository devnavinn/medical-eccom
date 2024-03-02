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
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    street: z.string().nonempty({ message: "Street is required" }),
    zip: z.string().min(5, { message: "Post code must be at least 5 characters long" }).max(5, { message: "Post code must be at most 5 characters long" }).nonempty({ message: "Post code is required" })
    ,
    city: z.string().nonempty({ message: "City is required" }),
})
import { useTranslation } from "react-i18next"
import { useToast } from './../../components/ui/use-toast'
export default function PostAddress() {
    const { toast } = useToast()
    const { t } = useTranslation()
    const { postAddress } = t("specify-data")
    const { firstName, lastName, street, postCode, city, button } = postAddress
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(FormSchema)
    })

    async function onSubmit(data) {
        console.log(data)
        const formData = {
            sessionId: localStorage.getItem('sessionId'),
            postAddressForm: {
                ...data
            }
        }
        console.log('formdata', formData);

        const res = await orderPlace(formData)
        console.log('res', res);
        if (res.sessionId) {
            toast({
                title: "Success",
                description: "Application will be reviewed soon",
            })
            // navigate('/')
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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

                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form>
    )
}
