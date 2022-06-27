import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import { getBillListItems } from "~/models/bill.server";
import { urlPath } from "~/constants/url-paths";
import { Container, Text, Box, IconButton, Stack } from "@chakra-ui/react";
import useResize from "~/hooks/use-resize";
import BillsTable from "~/components/Bills/BillsTable";
import BillsList from "~/components/Bills/BillsList";
import { AddIcon } from "@chakra-ui/icons";

type LoaderData = {
  billListItems: Awaited<ReturnType<typeof getBillListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const billListItems = await getBillListItems({ userId });
  return json<LoaderData>({ billListItems });
};

export default function BillsPage() {
  const navigate = useNavigate();
  const data = useLoaderData<LoaderData>();
  const { width } = useResize(250);
  const [showList, setShowList] = React.useState(false);

  React.useEffect(() => {
    setShowList(width <= 500);
  }, [width]);

  return (
    <Container maxWidth={1200}>
      <Text textAlign="center" fontSize="3xl" fontWeight="semibold">
        Bills
      </Text>
      <Stack direction="column">
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="Search database"
            icon={<AddIcon />}
            borderRadius="full"
            colorScheme="teal"
            color="white"
            onClick={() => navigate(urlPath.BILLS_ADD)}
          />
        </Box>
        {showList ? (
          <BillsList billsList={data.billListItems} />
        ) : (
          <BillsTable billsList={data.billListItems} />
        )}
      </Stack>
    </Container>
  );
}
