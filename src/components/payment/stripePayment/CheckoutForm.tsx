/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

import { useState } from "react";

import axios from "axios";
import { constructNow } from "date-fns";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { UserBillingType } from "@/app/(commonLayout)/payment/[id]/page";
import { useCreateBillingInfoMutation } from "@/redux/features/Subscription/subscriptionSlice";

interface FormData {
  phone: string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  additionalInfo: string;
}

interface UserBillingInfoProps {
  userBillingInfo: UserBillingType;
  setUserBillingInfo: React.Dispatch<React.SetStateAction<UserBillingType>>;
}

function PaymentForm({
  userBillingInfo,
  setUserBillingInfo,
}: UserBillingInfoProps) {
  const router = useRouter();

  const [paymentError, setPaymentError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    control,

    reset,
    formState: { errors },
  } = useForm<FormData>();


  const [createBilling]=useCreateBillingInfoMutation()

  const subData: any = useSelector(
    (state: RootState) => state.subscriptionData.subscription
  );

  const clientSecretId = subData?.clientSecret;
  const paymentIntentId = subData?.paymentIntentId;
  console.log(clientSecretId, paymentIntentId);

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setPaymentProcessing(true);

    try {
      // Create payment method using Stripe Elements
      const paymentElement = elements.getElement(PaymentElement);
      if (!paymentElement) {
        setPaymentError(
          "Payment element not found. Please refresh and try again."
        );
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message || "Payment validation failed.");
        return;
      }
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          // type: "card",
          elements,
          params: {
            billing_details: {
              name: data.firstName,
              email: data.email,
              phone: data.phone,
              address: {
                country: "US",
              },
            },
          },
        });

      const { id }: any = paymentMethod;
      console.log("pm ==", id);

      if (stripeError) {
        toast.error(stripeError.message || "Payment failed");
        setPaymentProcessing(false);
        return;
      }

      //  Confirm payment
      const confirmRes = await axios.post(
        `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
        {
          payment_method: id,
          client_secret: clientSecretId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Payment Confirmed:", confirmRes.data);
      const res = await createBilling(userBillingInfo)
      console.log(res)
      toast.success("Payment successful!");
      reset();
      setPaymentProcessing(false);
      router.push("/signIn");
    } catch (err) {
      console.log(err);
      toast.error("Failed to process payment. Please try again.");
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="p-6 ">
      <div className="w-[550px]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Right Column - Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl lg:text-3xl font-semibold text-gray-900 mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
              </div>

              <PaymentElement
                options={{
                  layout: "tabs",
                  fields: {
                    billingDetails: {
                      address: {
                        country: "never",
                      },
                    },
                  },
                }}
              />
              {/* </Elements> */}
              <button
                type="submit"
                disabled={!stripe || paymentProcessing}
                className="w-full bg-primary cursor-pointer hover:bg-green-8 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 mt-6"
              >
                {paymentProcessing ? "Processing..." : `Pay`}
              </button>
              {paymentError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{paymentError}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;


