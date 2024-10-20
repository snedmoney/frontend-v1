import { Button } from "@nextui-org/react";
import FlowLayout from "@/layouts/flow-layout";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";
import { AiOutlineAreaChart } from "react-icons/ai";
import { HiLightningBolt } from "react-icons/hi";
import { AnimatedNotifications } from "@/components/animatedNotifications";
import { ReactNode } from "react";
import { PiHandCoinsFill } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";

//TODO: I need to check against backend api and see if the wallet already has created a page.
//if so i just show their profile page and say only 1 profile allowed per wallet
//this logic only applies to profile page. There can be many donation pages

const SignUpPage = ({ isDonationPage }: { isDonationPage?: boolean }) => {
  const { totalSteps, completeStep } = useCreateProfileFlow();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (isConnected && address) {
      completeStep(1);
      navigate("/create/profile/user-info1");
    } else {
      openConnectModal?.();
    }
  };

  const leftContent = (
    <div className="flex flex-col h-full justify-between py-4 md:py-8 md:px-6">
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            {isDonationPage
              ? "Crowdfunding Reimagined - Swift and Borderless"
              : "Next Gen Financial Infrastructure for Content Creators"}
          </h1>
          <h2 className="text-base md:text-lg font-semibold text-foreground/80">
            {isDonationPage
              ? "A new era of fundraising any cause that transcends traditional limitations"
              : "We figure out the money stuff, so you can focus on building a community"}
          </h2>
        </div>
        <div className="space-y-4 md:space-y-5">
          <FeatureItem
            icon={<PiHandCoinsFill size="18" />}
            title={isDonationPage ? "Transparency and Trust" : "Monetize"}
            description={
              isDonationPage
                ? "Build trust in your campaign with transparency at the core. Every transaction is recorded in public and on-chain."
                : "Unlock new revenue streams: Launch NFT backed memberships, receive tips, or start a store - all in one place."
            }
          />
          <FeatureItem
            icon={<AiOutlineAreaChart size="18" />}
            title="Analytics"
            description={
              isDonationPage
                ? "See how your fundraiser is performing, track donations in real-time, and gain insights to optimize your campaign."
                : "Gain valuable insights into your earnings. Track your growth and increase your income."
            }
          />
          <FeatureItem
            icon={<HiLightningBolt size="18" />}
            title="Instant Access to Funds"
            description={
              isDonationPage
                ? "Immediate access to funds via crypto and put to good use. We are here to help you make a difference without delay."
                : "Experience the future of payments. Say goodbye to chargebacks and cross-border delays - welcome to truly global earnings."
            }
          />
        </div>
      </div>
    </div>
  );
  const rightContent = (
    <div className="flex flex-col">
      <h1 className="text-lg md:text-xl font-bold text-foreground md:text-center">
        {isDonationPage
          ? "Ready to raise funds for a cause that you care about?"
          : "Ready to make money doing what you love?"}
      </h1>
      <AnimatedNotifications isDonationPage={isDonationPage} />
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h2 className="text-base md:text-md font-semibold text-foreground/60 pt-4 md:pt-8">
          {isDonationPage
            ? "Creating a fundraiser is easy."
            : "Sign up is easy."}{" "}
          Simply connect your wallet to get started.
        </h2>

        <Button
          size="lg"
          className="w-full md:w-3/4 bg-foreground text-background font-bold flex items-center justify-center gap-2"
          onClick={handleNext}
        >
          {!isConnected ? (
            <>
              <IoWalletOutline size={20} />
              Connect Wallet
            </>
          ) : (
            <>
              Continue
              <IoIosArrowDroprightCircle size={20} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
  return (
    <FlowLayout
      leftContent={leftContent}
      rightContent={rightContent}
      currentStep={1}
      totalSteps={totalSteps}
    />
  );
};

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-default-300 p-2 rounded-full shrink-0">{icon}</div>
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-foreground/70 text-xs md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SignUpPage;
