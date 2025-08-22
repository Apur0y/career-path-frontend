'use client'
import { useCreateNewslatterMutation } from '@/redux/features/Subscription/subscriptionSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [createLatter] = useCreateNewslatterMutation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLetter = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault(); // Prevent page reload
    if (!email) return; // simple validation

    try {
      const res = await createLatter({ email })
      if (res?.data) {
        toast.success(" Subscribe to Newsletters Successfully!")
      }


      setEmail('');
      setLoading(false)
    } catch (error) {
      setLoading(false);

    }

  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <section className="bg-neutral-800 py-10 px-4 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          {/* Left - Heading */}
          <h2 className="text-white md:text-2xl font-semibold text-center md:text-left">
            Subscribe Newsletters
          </h2>

          {/* Right - Input + Button */}
          <form onSubmit={handleLetter} className="relative w-full md:max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoading(false)
              }}
              placeholder="Enter your email"
              className="w-full md:px-4 px-2 py-1 md:py-3 pr-40 rounded-md text-gray-800 bg-white"
            />
            <button
              type="submit"
              className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary text-white text-xs md:text-base px-2 py-1 md:px-5 md:py-2 rounded-md hover:bg-green-600 transition"
            >
              {
                loading ? <>SUBSCRIBING...</> : <>SUBSCRIBE NOW</>
              }

            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
