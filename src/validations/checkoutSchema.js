import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),

  phone: yup
    .string()
    .trim()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  address: yup
    .string()
    .trim()
    .min(5, "Enter a complete address")
    .required("Address is required"),

  city: yup
    .string()
    .trim()
    .required("City is required"),

  state: yup
    .string()
    .trim()
    .required("State is required"),

  pincode: yup
    .string()
    .trim()
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
});