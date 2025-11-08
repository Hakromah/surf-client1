"use client";
import { useActionState } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Block } from "@/types";
import { formatDate } from "@/utils/format-date";
import { StrapiImage } from "./StrapiImage";
import { SubmitButton } from "./SubmitButton";
import { eventsSubscribeAction } from "@/data/actions";

const INITIAL_STATE = {
   zodErrors: null,
   strapiErrors: null,
   errorMessage: null,
   successMessage: null,
   formData: null,
};

interface TextInputProps {
   id: string;
   label: string;
   name: string;
   type?: string;
   error?: string;
   defaultValue?: string;
}

function TextInput({
   id,
   label,
   name,
   type = "text",
   error,
   defaultValue,
}: TextInputProps) {
   return (

      <div className="mb-6">
         {/* Replicating .copy styles (label text) */}
         <label htmlFor={id} className="text-gray-700 block mb-2 font-black">
            {label}
         </label>
         <input
            type={type}
            name={name}
            id={id}
            // Replicating .input, .input__text, and .input--beige
            // This gives it full width, padding, rounded corners, and the beige background
            className="w-full p-3 rounded-lg bg-[#f1e8d9] focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
            defaultValue={defaultValue}
         />
         {/* Replicating .input__error styles */}
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
   );
}

export function EventSignupForm({
   blocks,
   eventId,
   startDate,
   price,
   image,
}: {
   blocks: Block[];
   eventId: string;
   startDate?: string;
   price?: string;
   image?: {
      url: string;
      alt: string;
   };
}) {
   // Note: useActionState is needed if INITIAL_STATE is used. Added import above.
   const [formState, formAction] = useActionState(eventsSubscribeAction, INITIAL_STATE);

   const zodErrors = formState?.zodErrors;
   const strapiErrors = formState?.strapiErrors?.message;
   const successMessage = formState?.successMessage;

   return (

      // The light beige background is applied here for the entire form area.
      <section className="w-full flex flex-col md:flex-row pt-0 md:p-10 bg-stone-50 rounded-xl">
         <div className="md:mx-auto mb-8 w-full flex flex-col items-center md:items-start gap-4">
            <BlockRenderer blocks={blocks} />
            <div className="ml-5 flex flex-col gap-2 w-[45%] text-center md:text-left">
               {startDate && (
                  <p className="text-gray-600">
                     <span className="font-bold">StartDate:</span> {formatDate(startDate)}
                  </p>
               )}
               {price && (
                  <p className="text-gray-800 mb-4">
                     <span className="font-bold">Price:</span> {price}
                  </p>
               )}
            </div>
         </div>

         <form className="signup-form__form w-full md:w-[49%] " action={formAction}>
            {image && (
               <StrapiImage
                  src={image.url}
                  alt={image.alt}
                  height={200}
                  width={200}
                  className="signup-form__image w-full mb-6 mx-auto rounded-2xl"
               />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
               <TextInput
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  error={zodErrors?.firstName}
                  defaultValue={formState?.formData?.firstName || ""}
               />

               <TextInput
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={zodErrors?.lastName}
                  defaultValue={formState?.formData?.lastName || ""}
               />
            </div>

            {/* Standard full-width fields */}
            <TextInput
               id="email"
               label="Email"
               name="email" type="email"
               error={zodErrors?.email}
               defaultValue={formState?.formData?.email || ""}
            />
            <TextInput
               id="phone"
               label="Phone"
               name="telephone" type="text"
               error={zodErrors?.telephone}
               defaultValue={formState?.formData?.telephone || ""}
            />

            {/* Hidden field */}
            <input hidden type="text" name="eventId" defaultValue={eventId} />

            <div className="mt-8">
               <SubmitButton
                  text="Sign Up" // Changed text to match image
                  className="w-[30%] text-xl text-center text-white font-bold p-5 rounded-full bg-teal-500 hover:bg-teal-600 transition duration-200 shadow-md"
               />
               {strapiErrors && (
                  <p className="mt-4 text-center text-red-500">{strapiErrors}</p>
               )}{successMessage && (
                  <p className="mt-4 text-center text-green-500">{successMessage}</p>
               )}
            </div>
         </form>
      </section>
   );
}
