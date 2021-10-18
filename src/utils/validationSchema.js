import * as Yup from 'yup';

export const DisplayingLoginErrorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Please, enter a valid email').required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(   //(?=.*[@#$%^&-+=()] 
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
        )
});

export const DisplayingRegisterErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^(?!\s*$)[-a-zA-Z\d_:,.ŠšĄąĖėŲųČčĮįŪūŽž]{1,12}$/, "The name cannot include empty spaces")
        .required('Required')
        .min(3, 'Your name should be 3 chars minimum.'),
    lastName: Yup.string()
        .matches(/^(?!\s*$)[-a-zA-Z\d_:,.ŠšĄąĖėŲųČčĮįŪūŽž]{1,12}$/, "The name cannot include empty spaces")
        .required('Required')
        .min(3, 'Your lastname should be 3 chars minimum.'),
    email: Yup.string().email('Please, enter a valid email').required('Required'), 
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(   //(?=.*[@#$%^&-+=()] 
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
        )
});

export const DisplayingUpdateProfileErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^(?!\s*$)[-a-zA-Z\d_:,.ŠšĄąĖėŲųČčĮįŪūŽž]{1,12}$/, "The name cannot include empty spaces")
        .min(3, 'Your name should be 3 chars minimum.'),
    lastName: Yup.string()
        .matches(/^(?!\s*$)[-a-zA-Z\d_:,.ŠšĄąĖėŲųČčĮįŪūŽž]{1,12}$/, "The name cannot include empty spaces")
        .min(3, 'Your lastname should be 3 chars minimum.'),
    email: Yup.string().email('Please, enter a valid email'), //.unique('Email must be unique'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(   //(?=.*[@#$%^&-+=()] 
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
        )
});