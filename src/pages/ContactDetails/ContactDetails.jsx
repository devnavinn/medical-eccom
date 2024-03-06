import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { orderPlace } from "../../api/api"
import { useCart } from "../../context/CartContext"
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
    kontaktTyp: z.string().nonempty(),
    anrede: z.string().nonempty(),
    vorname: z.string().nonempty(),
    nachname: z.string().nonempty(),
    email: z.string().email(),
    telefon: z.string().nonempty().regex(/^\d+$/).min(10, {
        message: "Phone number must contain only numbers and have a minimum of 10 digits",
    }).max(10, {
        message: "Phone number must contain only numbers and have a maximum of 10 digits",
    }),
    versicherungsTyp: z.string().nonempty(),
    datenschutz: z.boolean(),
})

import { useTranslation } from "react-i18next"
function ContactDetails() {
    const { t } = useTranslation()
    const { contactDetails } = t("specify-data")
    const { iam, gender, firstName, lastName, email, phone, insuredIs, declaration, button } = contactDetails
    const { cart, sliderValue, size } = useCart()
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: localStorage.getItem('contactDetails') ? JSON.parse(localStorage.getItem('contactDetails')) : {}
    })

    async function onSubmit(data) {
        console.log(data)
        const formData = {
            stepPath: "contact-details",
            contactForm: {
                ...data
            },
            productsForm: {
                totalPrice: sliderValue,
                gloveSize: size,

                product_details: cart
            }
        }
        localStorage.setItem('contactDetails', JSON.stringify(data))
        await orderPlace(formData).then(res => {
            localStorage.setItem('sessionId', res.sessionId)
            console.log('res', res);
            if (res?.sessionId) {
                navigate('/continue')
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">

                    <FormField
                        control={form.control}
                        name="kontaktTyp"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>{iam?.label}*</FormLabel>
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
                                                {iam?.value1}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="relative/caregiver" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {iam?.value2}
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
                        name="anrede"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>{gender?.label}*</FormLabel>
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
                                                {gender?.value1}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Woman" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {gender?.value2}
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
                        name="vorname"
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
                        name="nachname"
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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{email?.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={email?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{phone?.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={phone?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="versicherungsTyp"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel className='text-2xl text-[#003780]'>{insuredIs?.label}</FormLabel>
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
                                            {insuredIs?.value1}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Privately insured" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {insuredIs?.value2}
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
                    name="datenschutz"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    {declaration?.label}
                                </FormLabel>
                                <FormDescription>
                                    {/* <span className="font-semibold">{declaration?.value1}: </span>{declaration?.value2} */}
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form>
    )
}

export default ContactDetails