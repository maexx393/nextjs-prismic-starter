import { useState, useContext } from "react";
import styles from './styles.module.scss';
import axios from "axios";
import { useRouter } from 'next/router'
import { AppContext } from "context/AppContext";
import { validateName, validateEmail, validateLegal, validateMessage } from '@utils/inputValidation';

import { 
    Modal,
    Input,
    Textarea,
    Checkbox,
    Range,
    Submit } from '@components/index';

const Contact = () => {

    const lang = useRouter().locale.substr(0,2);
    const { uiContents } = useContext(AppContext);

    const formObj = {
        name: '', 
        email: '', 
        message: '', 
        legal: false,
        sent: false, 
        sending: false, 
        sendingError: false,
        formValidationError: false,
        success: false,
        validation: {
            name: false,
            email: false,
            message: false,
            legal: false,
        }
    }

    const [data, setData] = useState(formObj)

    const handleChange = (e, valid) => {
        console.log(e.target.value);
        const {name, value, checked} = e.target;
        let isCheckBox = e.target.hasOwnProperty('checked');

        setData({
            ...data,
            [name]: isCheckBox ? checked : value,
            validation: {
                ...data.validation,
                [name]: valid
            }
        })
    }

    const reset = () => {
        setData(formObj)
    }
    

    const validateBeforeSend = () => {
        let values = Object.values(data.validation);
        let res = values.includes(false);

        setData({
            ...data,
            formValidationError: res,
        })
        return !res;
    }


    const formSubmit = (e) => {
        e.preventDefault();

        if(!validateBeforeSend()) { return }

        setData({
            ...data,
            sending: true,
            error: []
        })
        
        axios.post('/api/sendmail', data)
        .then(res => {
            if(res.data.result !=='success') {
                setData({
                    ...data,
                    sent: false,
                    sending: false,
                    sendingError: true,
                })
            } else {
                setData({
                    ...data,
                    sent: true,
                    sending: false,
                    success: true,
                    sendingError: false,
                })
            }
        }).catch( (err) => {
            setData({
                ...data,
                sending: false,
                sendingError: true,
            })
        })
    }


    return (
        <section className={styles.container}>
        <form>
            
            <Input 
                handler={handleChange}
                value={data.name}
                label={uiContents.inputName.label[lang]}
                name={`name`}
                type={`text`}
                validation={validateName}
                placeholder={uiContents.inputName.placeholder[lang]}
                hasFormValidationError={data.formValidationError && !data.validation.name}
                errorMessage={
                    data.name === '' 
                    ?   uiContents.inputName.error[lang].missing
                    :   uiContents.inputName.error[lang].failed
                }
            />

            <Range
                handler={handleChange}
                value={0}
                min={-50}
                max={50}
                name={`legal`}
                type={`range`}
                validation={null}
                label={'Range Slider'}
                hasFormValidationError={data.formValidationError && !data.validation.legal}
                errorMessage={'Range Slider Error Message'}
            />

            <Input 
                handler={handleChange}
                value={data.email}
                label={uiContents.inputEmail.label[lang]}
                name={`email`}
                type={`email`}
                validation={validateEmail}
                placeholder={uiContents.inputEmail.placeholder[lang]}
                hasFormValidationError={data.formValidationError && !data.validation.email}
                errorMessage={
                    data.email === '' 
                    ?   uiContents.inputEmail.error[lang].missing
                    :   uiContents.inputEmail.error[lang].failed
                }
            />

            <Textarea
                handler={handleChange}
                value={data.message}
                label={uiContents.inputMessage.label[lang]}
                name={`message`}
                validation={validateMessage}
                placeholder={uiContents.inputMessage.placeholder[lang]}
                hasFormValidationError={data.formValidationError && !data.validation.message}
                errorMessage={
                    data.message === '' 
                    ?   uiContents.inputMessage.error[lang].missing
                    :   uiContents.inputMessage.error[lang].failed
                }
            />

            <Checkbox
                handler={handleChange}
                checked={data.legal}
                name={`legal`}
                value={`accepted`}
                validation={validateLegal}
                label={uiContents.inputLegal.label[lang]}
                hasFormValidationError={data.formValidationError && !data.validation.legal}
                errorMessage={uiContents.inputLegal.error[lang].failed}
            />

            <Submit 
                handler={formSubmit}
                sending={data.sending}
                text={uiContents.formSubmit.contact[lang]}
            />



        </form>

        {data.success &&
            <Modal>
                Thank you
            </Modal>
        }
        </section>

    )
}

export default Contact;