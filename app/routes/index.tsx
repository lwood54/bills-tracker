import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { BackgroundContainer } from "~/components/BackgroundContainer";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import type { Bill } from "~/models/bill.server";
import { getBillListItems } from "~/models/bill.server";
import Card from "~/components/Card";
import { getTotals } from "~/helpers/paydown";
import LoginWelcome from "~/components/LoginWelcome/login-welcome";
import { BillsWidget } from "~/components/BillsWidget";
import { NoBills } from "~/components/NoBills";

type LoaderData = {
  billListItems: Bill[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const billListItems = await getBillListItems({ userId });
  return json<LoaderData>({ billListItems });
};

export default function Index() {
  const data = useLoaderData();
  const user = useOptionalUser();
  const details = getTotals(data.billListItems);

  const renderDashboard = React.useMemo(() => {
    if (data.billListItems.length > 0) {
      return <BillsWidget details={details} />;
    }
    return <NoBills />;
  }, [data.billListItems.length, details]);

  return (
    <BackgroundContainer>
      {user ? renderDashboard : <LoginWelcome />}
    </BackgroundContainer>
  );
}
