import CreateProfileFlowContext, {
  CreateProfileFlowData,
} from "./createProfileFlowContext";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { apiClient } from "@/config/api";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

const FORM_DATA_STORAGE_KEY = "createProfileFormData";
const CURRENT_STEP_STORAGE_KEY = "currentProfileStep";

export const defaultFormValues: CreateProfileFlowData = {
  walletAddress: "",
  name: "",
  slogan: "",
  userName: "",
  about: "",
  paymentMethod: {
    chainId: 0,
    tokenAddress: "",
  },
  websiteLink: "",
  socialAccounts: {
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    discord: "",
    tiktok: "",
    twitch: "",
    link1: "",
    link2: "",
  },
};

//TODO: need to check against backend to see if wallet already created profile then redirect to their page
//TODO: need to make sure username is unique/available at the time of submit
export const CreateProfileFlowProvider = ({
  totalSteps,
  children,
}: {
  totalSteps: number;
  children: ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = sessionStorage.getItem(CURRENT_STEP_STORAGE_KEY);

    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const getInitialFormValues = (): CreateProfileFlowData => {
    const savedData = sessionStorage.getItem(FORM_DATA_STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      return { ...defaultFormValues, ...parsedData };
    }

    return defaultFormValues;
  };

  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const methods = useForm<CreateProfileFlowData>({
    mode: "onChange",
    defaultValues: getInitialFormValues(),
  });

  const resetFlow = useCallback(() => {
    setCurrentStep(1);
    sessionStorage.removeItem(FORM_DATA_STORAGE_KEY);
    sessionStorage.removeItem(CURRENT_STEP_STORAGE_KEY);
    methods.reset(defaultFormValues);
  }, [methods]);

  useEffect(() => {
    if (!isConnected) resetFlow();
  }, [isConnected, resetFlow]);

  useEffect(() => {
    const subscription = methods.watch((data) => {
      sessionStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(data));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_STEP_STORAGE_KEY, currentStep.toString());
  }, [currentStep]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const setStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
        sessionStorage.setItem(CURRENT_STEP_STORAGE_KEY, step.toString());
      }
    },
    [totalSteps],
  );

  const onSubmit = async (data: CreateProfileFlowData) => {
    try {
      console.log("Submitting data:", data);
      const { data: savedData } = await apiClient.post("/users", {
        ...data,
        type: "profile",
      });
      const {
        savedUser: { userName },
      } = savedData;
      resetFlow();
      navigate(`/profile/${userName}?openShareModal=true`);
      toast.success("Information Saved");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Error submitting form: ${error}`);
    }
  };

  return (
    <>
      <CreateProfileFlowContext.Provider
        value={{
          currentStep,
          totalSteps,
          nextStep,
          prevStep,
          setStep,
          resetFlow,
          onSubmit,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
      </CreateProfileFlowContext.Provider>
    </>
  );
};
