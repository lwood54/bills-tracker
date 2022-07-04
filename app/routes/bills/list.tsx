import * as React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import type { Bill } from "~/models/bill.server";
import { getBillListItems } from "~/models/bill.server";
import { urlPath } from "~/constants/url-paths";
import { Container, Text, Box, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BillsTable } from "~/components/Bills/BillsTable";
import useBreakpoints, { BP, BP_VALUES } from "~/hooks/use-breakpoints";
import { BillsList } from "~/components/Bills/BillsList";
import { BackgroundContainer } from "~/components/BackgroundContainer";

type LoaderData = {
  billListItems: Bill[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const billListItems = await getBillListItems({ userId });
  return json<LoaderData>({ billListItems });
};

export default function BillsPage() {
  const navigate = useNavigate();
  const data = useLoaderData<LoaderData>();
  const pageRef = React.useRef({} as HTMLDivElement);
  const size = useBreakpoints(pageRef, BP_VALUES);

  return (
    <BackgroundContainer p="4">
      <Container
        maxWidth={1200}
        boxShadow="lg"
        border="1px"
        borderColor="teal.600"
        bg="rgba(119, 222, 247, .5)"
        py="4"
        ref={pageRef}
      >
        <Text
          color="white"
          textAlign="center"
          fontSize="3xl"
          fontWeight="semibold"
        >
          Bills
        </Text>
        <Stack direction="column">
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              aria-label="Search database"
              icon={<AddIcon />}
              borderRadius="full"
              bgColor="teal.600"
              color="white"
              onClick={() => navigate(urlPath.BILLS_ADD)}
            />
          </Box>
          {size === BP.sm ? (
            <BillsList billsList={data.billListItems} />
          ) : (
            <BillsTable billsList={data.billListItems} />
          )}
        </Stack>
      </Container>
    </BackgroundContainer>
  );
}
