import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getBillListItems } from "~/models/bill.server";
import Paydown from "~/components/Bills/Paydown";
import Button, { BTN } from "~/components/Button";
import { urlPath } from "~/constants/url-paths";

type LoaderData = {
  billListItems: Awaited<ReturnType<typeof getBillListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const billListItems = await getBillListItems({ userId });
  return json<LoaderData>({ billListItems });
};

export default function BillsPage() {
  const data = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="bills-list-container">
        <Link className="button-container" to={urlPath.BILLS_ADD}>
          <Button variant={BTN.SAVE} label="Add Bill" />
        </Link>
        {data.billListItems.map((bill) => (
          <div onClick={() => navigate(bill.id)} key={bill.id}>
            <Paydown showTitle bill={bill} />
          </div>
        ))}
      </main>
    </div>
  );
}
