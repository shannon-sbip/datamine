import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import getUnsealedData from "../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../lib/getUserEventFromDbByUserId";
import type { User } from "../types/user";
const Page: NextPage<{ user: User | null }> = ({ user }) => {
  if (!user) {
    return (
      <div>
        This link is no longer valid, please generate a new Magic Link.
      </div>
    );
  }
  const {
    id,
    email,
    name,
    affilation,
    downloadCount,
    maxDownloadCount,
    validFrom,
    validTo,
    isAdmin
  } = user;
  return (
    <div>
      <span>
        Welcome
        {" "}
        {name.toUpperCase()}
        !
      </span>
      <table>
        <tbody>
          <tr>
            <td>ID: </td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Affilation: </td>
            <td>{affilation}</td>
          </tr>
          <tr>
            <td>Downloads: </td>
            <td>{downloadCount}</td>
          </tr>
          <tr>
            <td>Max Download Count: </td>
            <td>{maxDownloadCount}</td>
          </tr>
          <tr>
            <td>Valid From: </td>
            <td>{(new Date(validFrom)).toISOString()}</td>
          </tr>
          <tr>
            <td>Valid To: </td>
            <td>{(new Date(validTo)).toISOString()}</td>
          </tr>
          <tr>
            <td>Is Admin: </td>
            <td>{isAdmin ? "TRUE" : "FALSE"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<{ user: User | null }> = async (context) => {
  const prisma = new PrismaClient();
  const seal = String(context.query.seal);
  const unsealData = await getUnsealedData(seal);
  const userEvent = await getUserEventFromDbByUserId(prisma, unsealData.userId);
  if (userEvent?.id !== unsealData.eventId) {
    return {
      props: {
        user: null
      }
    };
  }
  return {
    props: {
      user: {
        id: userEvent.userId,
        email: userEvent.email,
        name: userEvent.name,
        affilation: userEvent.affilation,
        isActive: userEvent.isActive,
        downloadCount: 0,
        maxDownloadCount: userEvent.maxDownloadCount,
        validFrom: userEvent.validFrom.getTime(),
        validTo: userEvent.validTo.getTime(),
        isAdmin: userEvent.isAdmin
      }
    }
  };
};
export default Page;
