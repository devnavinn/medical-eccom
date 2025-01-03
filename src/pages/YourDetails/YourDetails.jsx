"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { orderPlace } from "../../api/api"
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
const notFutureDate = (value) => {
    if (value instanceof Date) {
        const now = new Date();
        if (value > now) {
            throw new Error("Date cannot be in the future");
        }
    }
    return true;
};
const FormSchema = z.object({
    Kontakttyp: z.string().nonempty(),
    Anrede: z.enum(["Herr", "Frau"], {
        required_error: "Sie müssen eine Anrede auswählen.",
    }),
    Vorname: z.string().nonempty({ message: "Vorname ist erforderlich." }).regex(/^[A-Za-zÄäÖöÜüß]+$/, { message: "Vorname darf nur Buchstaben enthalten." }),
    Nachname: z.string().nonempty({ message: "Nachname ist erforderlich." }).regex(/^[A-Za-zÄäÖöÜüß]+$/, { message: "Nachname darf nur Buchstaben enthalten." }),
    Straße: z.string().nonempty(),
    PLZ: z.string().min(5, { message: "Die Postleitzahl muss mindestens 5 Zeichen lang sein" })
        .max(5, { message: "Die Postleitzahl darf nicht mehr als 5 Zeichen lang sein" })
        .regex(/^\d+$/, { message: "Die Postleitzahl darf nur aus Zahlen bestehen" }),
    Stadt: z.string().nonempty({ message: "Stadt ist erforderlich." }).regex(/^[^\d\s]+$/, { message: "Stadt darf keine Ziffern enthalten." }),
    Geburtsdatum: z.string().nonempty(),
    Telefon: z.string().nonempty().regex(/^\d+$/).min(9, {
        message: "Die Telefonnummer darf nur aus Zahlen bestehen und muss mindestens 9 Zeichen lang sein",
    }),
    'E_Mail': z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein").nonempty(),
    Versicherungstyp: z.string().nonempty(),
    Versicherungsnummer: z
        .string()
        .nonempty()
        .regex(/^[a-zA-Z][0-9]{9}$/, 'Bitte geben Sie eine gültige Versicherungsnummer ein (muss mit einem Buchstaben beginnen und von 9 Ziffern gefolgt werden)'),
    Krankenversicherung: z.string().nonempty(),
    // link: z.string().nonempty(),
    "in_Pflege_seit": z.string().nonempty(),
    Pflegeperson: z.boolean(),

})
import { useTranslation } from "react-i18next"
import { getOrderDetails, getInsurances } from "../../api/api"
import { useToast } from "@/components/ui/use-toast"

function YourDetils() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('sessionId');
    const isCopyLink = queryParams.get('return-source') === 'copy-link'
    const { toast } = useToast()
    const { t } = useTranslation()
    const { yourDetails } = t("specify-data")
    const { iam, gender, firstName, lastName, street, postCode, city, birthDate, heading1, telephoneNumber, email, insuranceInfo, insuranceNumber, insuranceName, heading2, heading3, heading4, levelCare, declaration, button } = yourDetails

    const [rating, setRating] = useState(3);
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionId) {
            localStorage.setItem('sessionId', sessionId)
            const fetchOrderDetails = async () => {
                const res = await getOrderDetails(sessionId)
                if (!res) return
                const orderDetails = res[0]
                localStorage.setItem('cart', JSON.stringify(orderDetails?.productsForm?.product_details))
                localStorage.setItem('size', orderDetails?.productsForm?.gloveSize)
                localStorage.setItem('contactDetails', JSON.stringify(orderDetails?.contactForm))
                localStorage.setItem('yourDetails', JSON.stringify(orderDetails?.contactForm))
                // localStorage.setItem('orderDetails', JSON.stringify(res))
            }
            fetchOrderDetails()

        }
    }, [sessionId])

    const [insuranceList, setInsuranceList] = useState([])
    useEffect(() => {
        getInsurances().then((res) => {
            setInsuranceList(res);
        }).catch(error => {
            console.error('Error fetching insurance list:', error);
        });
    }, []);
    const handleRatingClick = (value) => {
        // Update the rating when a star is clicked
        setRating(value);
    };
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...localStorage.getItem('yourDetails') ? JSON.parse(localStorage.getItem('yourDetails')) : {},
            ...localStorage.getItem('contactDetails') ? JSON.parse(localStorage.getItem('contactDetails')) : {}
        }
    })


    async function onSubmit(data) {
        localStorage.setItem('yourDetails', JSON.stringify(data))
        const formData = {
            sessionId: localStorage.getItem('sessionId'),
            insuredPersonForm: {
                Pflegegrad: rating,
                ...data
            }
        }

        await orderPlace(formData).then((res) => {
            navigate('/caregiver-details')
        })
    }

    const generateLink = () => {
        // Generate link
        const link = `${import.meta.env.VITE_API_FRONTEND_URL}/your-details?sessionId=${localStorage.getItem('sessionId')}&return-source=copy-link`
        return link
    }
    const onErrors = (errors) => {
        console.log(errors)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onErrors)} className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <FormField
                        control={form.control}
                        name="Kontakttyp"
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
                        name="Anrede"
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
                                                <RadioGroupItem value="Herr" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {gender?.value1}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Frau" />
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
                        name="Vorname"
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
                        name="Nachname"
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
                    name="Straße"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{street?.label} *</FormLabel>
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
                        name="PLZ"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{postCode?.label}</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder={postCode?.placeholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Stadt"
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
                    <FormField
                        control={form.control}
                        name="Geburtsdatum"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{birthDate?.label}*</FormLabel>
                                <FormControl>
                                    <Input max={new Date().toISOString().split('T')[0]} type='date'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="mt-24">
                    <h1 className="text-xl text-[#003780] font-semibold">{heading1}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                        <FormField
                            control={form.control}
                            name="Telefon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{telephoneNumber?.label}*</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder={telephoneNumber?.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="E_Mail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{email?.label}*</FormLabel>
                                    <FormControl>
                                        <Input placeholder={email?.placeholder} {...field} />
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
                        name="Versicherungstyp"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='text-2xl text-[#003780]'>{insuranceInfo?.label}</FormLabel>
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
                                                {insuranceInfo?.value1}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Privately insured" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {insuranceInfo?.value2}
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
                        <FormField
                            control={form.control}
                            name="Versicherungsnummer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{insuranceNumber?.label}*</FormLabel>
                                    <FormControl>
                                        <Input placeholder={insuranceNumber?.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Krankenversicherung"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{insuranceName?.label}*</FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                list="insuranceOptions"
                                                placeholder={insuranceName?.placeholder}
                                                {...field}
                                            />
                                            <datalist id="insuranceOptions">
                                                {/* Render options here */}
                                                {insuranceList?.map(option => (
                                                    <option key={option.insurance_name} value={option.insurance_name}>
                                                        {option.insurance_name}
                                                    </option>
                                                ))}
                                            </datalist>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <p>{heading2}</p>
                </div>
                <div className={`${isCopyLink && 'hidden'} flex justify-center items-center space-x-2`}>
                    <div
                        className="w-full border-2 border-[#003780] rounded-lg p-2 overflow-x-scroll whitespace-nowrap no-scrollbar"

                    >
                        <p> {generateLink()} </p>
                    </div>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(generateLink())
                            toast({
                                title: "Link copied",
                                description: "Link copied to clipboard",
                                status: "success",
                            })
                        }}
                        type="button" className="py-2 rounded bg-[#003780] text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>

                    </Button>
                </div>
                <div className="w-1/2">
                    <FormField
                        control={form.control}
                        name="in_Pflege_seit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-2xl text-[#003780]'>{heading4}</FormLabel>
                                <p>{levelCare?.label} *</p>
                                <FormControl>
                                    <Input max={new Date().toISOString().split('T')[0]} type='date'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col ">
                    <label>{levelCare?.label2}</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5, 'none'].map((value) => (
                            <Button
                                type="button"
                                key={value}
                                variant="outline"
                                className="w-12 h-10"
                                onClick={() => handleRatingClick(value)}
                                style={{
                                    color: rating === value ? 'white' : 'gray',
                                    backgroundColor: rating === value ? '#003780' : '',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                            >
                                {value}
                            </Button>
                        )


                        )}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="Pflegeperson"
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
                                <FormLabel className="text-base">{declaration}</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form >
    )
}

export default YourDetils