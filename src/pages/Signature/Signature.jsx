"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useForm } from "react-hook-form"
import { z } from "zod"
import formImg from '../../assets/form.svg'
import signImg from '../../assets/sign.svg'
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { orderPlace } from "../../api/api";
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
const FormSchema = z.object({
    costAssumptionSign: z.boolean().refine(val => val === true, {
        message: "Value must be true."
    }),
    supplier_sign: z.boolean().refine(val => val === true, {
        message: "Value must be true."
    }),
    dataProtection: z.boolean().refine(val => val === true, {
        message: "Value must be true."
    }),
    tramsCond: z.boolean().refine(val => val === true, {
        message: "Value must be true."
    }),
});


export default function Signature() {
    const navigate = useNavigate()
    const signatureRef = useRef();
    const [signature, setSignature] = React.useState(sessionStorage.getItem('signaturePath') || null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            security_emails: true,
        },
    })

    async function onSubmit(data) {
        sessionStorage.setItem('signature', JSON.stringify(data))
        sessionStorage.setItem('signaturePath', signature)
        const formData = {
            sessionId: sessionStorage.getItem('sessionId'),
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
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-[#003787] text-lg font-medium">Signature of the insured person or authorized representative</h3>
                    <p className="text-sm text-[#3E3E3E]">Sign on the line with your mouse or your finger if you are using a touch device.</p>
                    <div className="w-full mb-10">
                        <Dialog >
                            <DialogTrigger className='w-full h-60 border-b-2'>
                                <img className="w-full object-contain" src={signature} />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl font-medium text-[#003787]'>Signature</DialogTitle>

                                </DialogHeader>
                                <SignatureCanvas
                                    ref={signatureRef}
                                    penColor="black"
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas', onBlur: getSignatureData, }}
                                />
                                <div className="flex flex-row space-x-5">
                                    <Button variant={'outline'} onClick={() => clearSignature()}>Clear Signature</Button>
                                    <Button variant={'outline'} onClick={() => getSignatureData()} >Get Signature</Button>
                                </div>

                            </DialogContent>
                        </Dialog>


                    </div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="costAssumptionSign"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 rounded-lg border p-4">
                                    <div>
                                        <img src={formImg} alt="Form img" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Order form and application for cost coverage
                                            </FormLabel>
                                            <FormDescription>
                                                {`With all information about your desired care aids and approval of the cost assumption by the insured person's care insurance company.`}
                                            </FormDescription>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <FormControl className='flex space-x-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />

                                            </FormControl>
                                            <p>Accept signature</p>
                                        </div>

                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="supplier_sign"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 rounded-lg border p-4">
                                    <div>
                                        <img src={signImg} alt="Form img" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Order form and application for cost coverage
                                            </FormLabel>
                                            <FormDescription>
                                                {`With all information about your desired care aids and approval of the cost assumption by the insured person's care insurance company.`}
                                            </FormDescription>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <FormControl className='flex space-x-2'>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />

                                            </FormControl>
                                            <p>Accept signature</p>
                                        </div>

                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dataProtection"
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
                                            I agree to the terms and conditions of web care LBJ GmbH.
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tramsCond"
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
                                            I agree that pflege.de (web care LBJ GmbH) processes and records personal information (especially contact/health data - e.g. level of care) for advice or information via telephone, e-mail and post and delivery of aids for consumption The request from the health/nursing insurance companies is sent to them.
                                        </FormLabel>
                                        <FormDescription >
                                            <span className="font-bold">Note:</span>  A revocation is possible at any time in the future. Further information on data protection can be found here
                                        </FormDescription>
                                        <FormDescription>
                                            If I give the above-mentioned consents and declarations for a third party, e.g. a person in need of care, I assure that the third person has authorized me to issue the declaration of consent and can present this authorization to web care LBJ GmbH at any time.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />


                    </div>
                </div>
                <Button type="submit" className='py-2 px-24 rounded-3xl bg-[#003780] text-white'>Submit an application free of charge</Button>
            </form>
        </Form>
    )
}
