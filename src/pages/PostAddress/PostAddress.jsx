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
    Vorname: z.string().nonempty({ message: "Vorname ist erforderlich." }).regex(/^[A-Za-zÄäÖöÜüß]+$/, { message: "Vorname darf nur Buchstaben enthalten." }),
    Nachname: z.string().nonempty({ message: "Nachname ist erforderlich." }).regex(/^[A-Za-zÄäÖöÜüß]+$/, { message: "Nachname darf nur Buchstaben enthalten." }),
    Straße: z.string().nonempty({ message: "Straße ist erforderlich" }),
    PLZ: z.string().min(5, { message: "Die Postleitzahl muss mindestens 5 Zeichen lang sein" }).max(5, { message: "Die Postleitzahl darf höchstens 5 Zeichen lang sein" }).nonempty({ message: "Postleitzahl ist erforderlich" }),
    Stadt: z.string().nonempty({ message: "Stadt ist erforderlich" }),
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
            form.reset()
            navigate('/')
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        name="PLZ"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{postCode?.label} *</FormLabel>
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

                </div>

                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form>
    )
}
