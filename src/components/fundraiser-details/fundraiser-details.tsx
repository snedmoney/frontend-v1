import clsx from "clsx";

import DonationList from "../donation-list";

import DonationDescription from "./description";
import Organizer from "./organizer";
import SupportWords from "./support-words";
import Meta from "./meta";
import FeaturedImage from "./featured-image";
import Sidebar from "./sidebar/sidebar";

import { formatDateFromISOString } from "@/lib/utils";
import { FundraiserData } from "@/types";
import useGetTransactions from "@/hooks/use-get-transactions-by-linkid";

type FundraiserDetailsProps = {
  data: FundraiserData;
};

export const FundraiserDetails = ({ data }: FundraiserDetailsProps) => {
  const endDate = formatDateFromISOString(data.acceptUntil);
  const { data: transactions } = useGetTransactions(data.id);

  return (
    <div
      className={clsx(
        "container pt-16",
        "w-full grid grid-cols-1 [grid-template-areas:'title'_'image'_'end-date'_'sidebar'__'content']",
        "lg:grid-cols-[4fr_4fr_.5fr_4.5fr] lg:[grid-template-areas:'title_title_title_end-date'_'image_image_image_sidebar'_'content_content_._sidebar']",
      )}
    >
      <h1 className="[grid-area:title]">{data.title}</h1>
      <h3 className="[grid-area:end-date] mt-3 lg:pt-1 lg:text-right text-default-800 text-lg">
        End Date: {endDate}
      </h3>
      <Sidebar
        destinationChainId={data.destinationChain.id}
        destinationToken={data.destinationToken}
        destinationWalletAddress={data.destinationWallet.address}
        goalAmount={data.goalAmount}
        linkId={data.id}
        transactions={transactions}
      />
      <FeaturedImage />
      <div className="[grid-area:content]">
        <DonationDescription description={data.description} />
        {transactions && transactions.length > 0 && (
          <DonationList
            className="py-8 lg:hidden"
            transactions={transactions}
          />
        )}
        {data?.user?.name && <Organizer user={data.user} />}
        {transactions && transactions.length > 0 && (
          <SupportWords transactions={transactions} />
        )}
        <Meta createdAt={data.createdAt} />
      </div>
    </div>
  );
};
