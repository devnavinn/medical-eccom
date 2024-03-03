
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
    empfänger: z.string().nonempty({ message: "Empfänger ist erforderlich." }),
    firmenname: z.string().optional(),
    straße: z.string().optional(),
    plz: z.string().optional(),
    stadt: z.string().optional(),
    wechselZuPflegepaket: z.boolean().optional(),
    lieferstart: z.string().nonempty({ message: "Lieferstart ist erforderlich." }),

})
import { useTranslation } from "react-i18next"
export default function DeliveryOptions() {
    const { t } = useTranslation()
    const { deliveryOptions } = t("specify-data")
    const { heading1, select, companyName, street, postCode, city, heading2, isAgree, deliveryStart, button } = deliveryOptions
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: localStorage.getItem('deliveryOptions') ? JSON.parse(localStorage.getItem('deliveryOptions')) : {}
    })

    async function onSubmit(data) {
        console.log('data', data);
        localStorage.setItem('deliveryOptions', JSON.stringify(data))
        const formData = {
            sessionId: localStorage.getItem('sessionId'),
            deliveryOptionsForm: {
                ...data
            }
        }
        const res = await orderPlace(formData)
        if (res.sessionId) {
            navigate('/complete-application')
        }
    }
    const onErrors = (errors) => {
        console.log(errors)
    }
    const [isCommissionedServiceSelected, setIsCommissionedServiceSelected] = useState(false);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onErrors)} className="w-full space-y-6">
                <h3 className="text-2xl text-[#003780] mt-5">{heading1}</h3>
                <FormField
                    control={form.control}
                    name="empfänger"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{select?.label}</FormLabel>
                            <Select onValueChange={(value) => {
                                field.onChange(value);
                                setIsCommissionedServiceSelected(value === "To a commissioned nursing service" || value === "An einen beauftragten Pflegedienst");
                            }}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={select?.label} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={select?.value1}>{select?.value1}</SelectItem>
                                    <SelectItem value={select?.value2}>{select?.value2}</SelectItem>
                                    <SelectItem value={select?.value3}>{select?.value3}</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={`${isCommissionedServiceSelected ? 'block' : 'hidden'} grid grid-cols-1 md:grid-cols-2 gap-5`}>
                    <FormField
                        control={form.control}
                        name="firmenname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{companyName?.label}</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder={companyName?.placeholder}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="straße"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{street?.label}</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder={street?.placeholder}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="plz"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{postCode?.label}</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder={postCode?.placeholder}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stadt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{city?.label}</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder={city?.placeholder}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-10">
                    <h3 className="text-2xl text-[#003780] mb-5">{heading2}</h3>

                    <FormField
                        control={form.control}
                        name="wechselZuPflegepaket"
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
                                        {isAgree}
                                    </FormLabel>

                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="w-1/2 mt-5">
                        <FormField
                            control={form.control}
                            name="lieferstart"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{deliveryStart}*</FormLabel>
                                    <FormControl>
                                        <Input type='date'  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className='py-2 px-12 md:px-24 rounded-3xl bg-[#003780] text-white'>{button}</Button>
            </form>
        </Form>
    )
}
