"use client"
import { generatePdf } from "../../api/api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useForm } from "react-hook-form"
import { z } from "zod"
import formImg from '../../assets/pdf-form.png'
import signImg from '../../assets/pdf-sign.png'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { orderPlace } from "../../api/api";
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
const FormSchema = z.object({
    kostenannahmezeichen: z.boolean().refine(val => val === true, {
        message: "Wert muss true sein."
    }),
    lieferant_zeichen: z.boolean().refine(val => val === true, {
        message: "Wert muss true sein."
    }),
    datenschutz: z.boolean().refine(val => val === true, {
        message: "Wert muss true sein."
    }),
    trams_bed: z.boolean().refine(val => val === true, {
        message: "Wert muss true sein."
    }),
});

import { useTranslation } from "react-i18next";
export default function Signature() {
    const { t } = useTranslation()
    const { signatureData } = t("specify-data")
    const { heading, label1, label2, acceptSignature, acceptSignature2, isAgree, declaration, button, button2, button3 } = signatureData
    const navigate = useNavigate()
    const signatureRef = useRef();
    const [signature, setSignature] = React.useState(localStorage.getItem('signaturePath') || null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            security_emails: true,
        },
    })

    async function onSubmit(data) {
        localStorage.setItem('signature', JSON.stringify(data))
        localStorage.setItem('signaturePath', signature)
        const formData = {
            sessionId: localStorage.getItem('sessionId'),
            signatureForm: {
                ...data,
                sgnaturePath: signature
            }
        }
        const res = await orderPlace(formData)
        console.log('res', res);
        if (res.sessionId) {
            navigate('/thank-you')
        }
    }

    // Function to clear the signature
    const clearSignature = () => {
        setSignature(null);
        signatureRef.current.clear();
    };

    // Function to get the signature as a data URL
    const getSignatureData = () => {
        const imageData = signatureRef.current.toDataURL();
        // You can use imageData for further processing, such as saving to a database or sending it to a server
        setSignature(imageData);
        console.log(imageData);
    };

    const handleDownload = async () => {
        console.log('hii ');
        const sessionId = localStorage.getItem('sessionId')
        const res = await generatePdf(sessionId)
        if (!res) return console.log('No data found')
        const fullPath = `${import.meta.env.VITE_API_PDF_URL}/${res}`
        window.open(fullPath, '_blank');
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-[#003787] text-lg font-medium">{label1}</h3>
                    <p className="text-sm text-[#3E3E3E]">{label2}</p>
                    <div className="w-full mb-10 mt-2">
                        <Dialog >
                            <DialogTrigger className='w-full h-60 border-2'>
                                <img className="w-full object-contain" src={signature} />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl font-medium text-[#003787]'>{heading}</DialogTitle>

                                </DialogHeader>
                                <SignatureCanvas
                                    ref={signatureRef}
                                    penColor="black"
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas', onBlur: getSignatureData, }}
                                />
                                <div className="flex flex-row space-x-5">
                                    <Button variant={'outline'} onClick={() => clearSignature()}>{button2}</Button>
                                    <DialogClose asChild>
                                        <Button variant={'outline'} onClick={() => getSignatureData()} >{button3}</Button>
                                    </DialogClose>
                                </div>

                            </DialogContent>
                        </Dialog>


                    </div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="kostenannahmezeichen"
                            render={({ field }) => (
                                <FormItem className="flex flex-col sm:flex-row items-center space-x-2 rounded-lg border p-4">
                                    <div className="cursor-pointer w-24" onClick={() => handleDownload()} >
                                        <img src={formImg} alt="Form img" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                {acceptSignature?.label}
                                            </FormLabel>
                                            <FormDescription>
                                                {acceptSignature?.value1}
                                            </FormDescription>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <FormControl className='flex space-x-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />

                                            </FormControl>
                                            <p>{acceptSignature?.value2}</p>
                                        </div>

                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lieferant_zeichen"
                            render={({ field }) => (
                                <FormItem className="flex flex-col sm:flex-row items-center justify-center space-x-2 rounded-lg border p-4">
                                    <div className="w-20">
                                        <img src={signImg} alt="Form img" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                {acceptSignature2?.label}
                                            </FormLabel>
                                            <FormDescription>
                                                {acceptSignature2?.value1}
                                            </FormDescription>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <FormControl className='flex space-x-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />

                                            </FormControl>
                                            <p>{acceptSignature2?.value2}</p>
                                        </div>

                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="datenschutz"
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
                        <FormField
                            control={form.control}
                            name="trams_bed"
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
                                            {declaration?.label}
                                        </FormLabel>

                                    </div>
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
