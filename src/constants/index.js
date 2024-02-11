const steps = {
    'contact-details': {
        title: 'Contact Details',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'countinue': {
        title: 'Countinue',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'your-details': {
        title: 'Your Details',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'caregiver-details': {
        title: 'Caregiver Details',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'delivery-options': {
        title: 'Delivery Options',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'complete-application': {
        title: 'Complete Application',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'signature': {
        title: 'Signature',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    },
    'thank-you': {
        title: 'Thank You',
        description: 'Your box is created. Now submit your personal data so that we can contact you for further application and processing of the curabox. After saving your contact details, you can provide all further details at your leisure. You are not submitting an order yet.'
    }
}

import icon1 from './../assets/con-card-1.svg'
import icon2 from './../assets/con-card-2.svg'
import icon3 from './../assets/con-card-3.svg'
import icon4 from './../assets/con-card-4.svg'
const countinue = [
    {
        heading: 'Complete online now',
        action: 'complete-online',
        description: 'Now provide all the necessary data and then sign the application digitally to receive your curabox in just a few working days.',
        icon: icon1
    },
    {
        heading: 'Continue later',
        action: 'continue-later',
        description: "Don't have all the data at hand? No problem. We will email you a link to your address:example@gmail.com which you can use to complete your application online at any time.",
        icon: icon2
    },
    {
        heading: 'Download application',
        action: 'download-application',
        description: 'Download the application with your previous data as a PDF to print it out, complete any missing information conveniently at home and then send the application back by post or email.',
        icon: icon3
    },
    {
        heading: 'Application received by post',
        action: 'application-received-by-post',
        description: "Don't have a printer? You will then receive the application with your previous details conveniently by post and send it back to us completely filled out free of charge.",
        icon: icon4
    }
]

import first from './../assets/first.svg'
import second from './../assets/second.svg'
import third from './../assets/third.svg'
const deliveryStep = [
    {
        icon: first,
        desc: 'Your application is now being processed and will be sent to the nursing care fund.'
    },
    {
        icon: second,
        desc: 'After approval from the care insurance company, you will receive your curabox free of charge directly to your home every month.'
    },
    {
        icon: third,
        desc: 'For your records you canhere Retrieve your completed form. You will shortly receive the form via email to mark@hotmail.com so that you can find it again at any time.'
    }
]
export { steps, countinue, deliveryStep }