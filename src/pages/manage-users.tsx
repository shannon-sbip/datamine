import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import getDistinctUsersFromDb from "../lib/getDistinctUsersFromDb";
import getUnsealedData from "../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../lib/getUserEventFromDbByUserId";
import type { User } from "../types/user";
import Button from "../ui/Button";
type PageProps = {
  users: Partial<User>[]
  seal: string
}
const Page: NextPage<PageProps> = ({ users, seal }) => (
  <div>
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>AFFILATION</td>
          <td>IS ADMIN</td>
          <td>VALID FROM</td>
          <td>VALID TO</td>
        </tr>
      </thead>
      <tbody>
        {users.map(({
          id, name, affilation, isAdmin, validFrom, validTo
        }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{affilation}</td>
            <td>{isAdmin ? "TRUE" : "FALSE"}</td>
            {validFrom && <td>{(new Date(validFrom)).toISOString()}</td>}
            {validTo && <td>{(new Date(validTo)).toISOString()}</td>}
          </tr>
        ))}
      </tbody>
    </table>
    <div>
      <Link href={{
        pathname: "/user",
        query: {
          seal
        }
      }}
      >
        <Button
          type="button"
        >
          My Profile
        </Button>
      </Link>
    </div>
  </div>
);
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const prisma = new PrismaClient();
  const seal = String(context.query?.seal || "");
  const unsealData = await getUnsealedData(seal);
  const userEvent = await getUserEventFromDbByUserId(prisma, unsealData.userId);
  if (userEvent?.id !== unsealData.eventId || !userEvent.isAdmin) {
    return {
      notFound: true
    };
  }
  const users = await getDistinctUsersFromDb(prisma);
  return {
    props: {
      seal,
      users
    }
  };
};
export default Page;
