"use client";
import Container from "@/components/ui/Container";
import {
  useCreateSubscirptionPlansMutation,
  useGetSubscirptionSinglePlansQuery,
} from "@/redux/features/Subscription/subscriptionSlice";
import { useParams, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "./Others/Loading";
import Link from "next/link";
import { toast } from "react-hot-toast";
import LoadingButton from "./loading/LoadingButton";
import { useDispatch } from "react-redux";
import { setSubscriptionData } from "@/redux/features/Subscription/subscriptionDataSlice";
import Cookies from "js-cookie";

// components/PlanSummaryCard.tsx
interface PlanSummaryProps {
  planName: string;
  price: number;
  permissions: string[];
  roleName: string;
}

const PlanSummaryCard: React.FC<PlanSummaryProps> = ({
  planName,
  price,
  permissions,
  roleName,
}) => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetSubscirptionSinglePlansQuery(id);
  const [createSubscription, { isLoading: btnLoading }] =
    useCreateSubscirptionPlansMutation();

  if (isLoading) {
    return <Loading />;
  }

  const accessToken = Cookies.get("accessToken");
  console.log(accessToken);

  console.log("aaa== ", accessToken);
  const planDetails = data?.data;
  console.log(planDetails);

  // payment submit
  const handlePayment = async () => {
    const planIdData = { planId: id };

    try {
      const response = await createSubscription({
        planIdData,
        accessToken,
      }).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        router.push(`/payment/${id}`);
        dispatch(setSubscriptionData(response.data));
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data.message);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-3xl md:text-5xl font-semibold">
          Plan Summary Card
        </h1>
        <div className="flex flex-col md:flex-row gap-6 mt-7 md:mt-12 ">
          <div className="flex flex-col border border-gray-50 lg:flex-row gap-6 lg:w-[800px] xl:w-[941px]  rounded-xl">
            {/* Plan Details Section */}
            <div className="bg-white p-6 rounded-lg shadow w-full">
              <h3 className=" md:text-2xl text-subtitle  font-semibold text-subtitle">
                {planDetails?.description}
              </h3>
              <h2 className="text-2xl md:text-5xl font-semibold text-gray-800">
                {planDetails?.planName}
              </h2>
              <p className="text-3xl font-bold text-primary mt-2">
                €{planDetails?.amount.toFixed(2)}{" "}
                <span className="text-base text-subtitle font-normal">
                  /month
                </span>{" "}
              </p>
              <p className="text-sm text-gray-500 mb-4"></p>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Permissions:
              </h3>
              <ul className="  text-gray-700 space-y-4">
                {planDetails?.features.map((perm: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-1" />
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Section */}
          </div>
          <div className="bg-white p-6 h-full rounded-lg shadow border space-y-3 border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Payment Medium
            </h3>
            <p className="text-gray-600 mt-1">
              You can change your plan at any time.
            </p>
            <p className="text-3xl font-bold text-primary mt-2">
              €{planDetails?.amount.toFixed(2)}{" "}
              <span className="text-base text-subtitle font-normal">
                /month
              </span>{" "}
            </p>

            <button
              onClick={handlePayment}
              className="w-full px-4 py-2 block bg-primary text-center text-white rounded-md hover:bg-primary transition cursor-pointer"
            >
              {btnLoading ? (
                <>
                  <LoadingButton />
                </>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlanSummaryCard;
