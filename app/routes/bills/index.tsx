import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getBillListItems } from "~/models/bill.server";
import Paydown from "~/components/Bills/Paydown";
import Button, { BTN } from "~/components/Button";
import { urlPath } from "~/constants/url-paths";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Text,
  Box,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useEventListener } from "~/hooks/use-event-listener";
import { useDebounce } from "~/hooks/use-debounce";
import useResize from "~/hooks/use-resize";
import BillsTable from "~/components/Bills/BillsTable";
import BillsList from "~/components/Bills/BillsList";
// import useResize from "~/hooks/use-resize";

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
  const { width: debouncedWidth } = useResize(250);
  const [width, setWidth] = React.useState(550); // NOTE: resize value set to state to prevent hydration issues

  React.useEffect(() => {
    setWidth(debouncedWidth);
  }, [debouncedWidth]);

  return (
    <Container maxWidth={1200}>
      <Text textAlign="center" fontSize="3xl" fontWeight="semibold">
        Bills
      </Text>
      {width > 500 ? (
        <BillsTable billsList={data.billListItems} />
      ) : (
        <BillsList billsList={data.billListItems} />
      )}
    </Container>
  );
}
