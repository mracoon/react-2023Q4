import * as yup from 'yup';
export const formValidationSchema = yup.object({
  name: yup
    .string()
    .required('Field is mandatory')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter must be uppercase'),
  age: yup
    .number()
    .required('Field is mandatory')
    .typeError('The field must be a number')
    .min(0, 'The value cannot be negative'),
  email: yup
    .string()
    .required('Field is mandatory')
    .email('Email has an invalid format')
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Email has an invalid format'
    ),
  password: yup
    .string()
    .required('Field is mandatory')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  confirmPassword: yup
    .string()
    .required('Field is mandatory')
    .oneOf([yup.ref('password')], 'should match the password field')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  tc: yup.boolean().test('tsChaecked', 'You should accept T&C', (tc) => !!tc),
  image: yup
    .mixed<FileList>()
    .required('Field is mandatory')
    .test('fileRequired', 'Image required', (file) => !!file)
    .test('fileSize', 'Only image up to 2MB are permitted.', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];
      return !file || file.size <= 2_000_000;
    })
    .test('fileType', 'The image must be in png or jpeg format', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];

      const allowedTypes = ['image/jpeg', 'image/png'];

      return allowedTypes.includes(file.type);
    }),
  country: yup.string().required('Field is mandatory'),
  gender: yup.string().required(),
});
