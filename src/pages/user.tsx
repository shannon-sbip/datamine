import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import getDownloadsFromDbByUserId from "../lib/getDownloadsFromDbByUserId";
import getUnsealedData from "../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../lib/getUserEventFromDbByUserId";
import type { User } from "../types/user";
import Button from "../ui/Button";
type PageProps = {
  user: User | null
  seal?: string
}
const Page: NextPage<PageProps> = ({ user, seal }) => {
  const [isLoading, setIsLoading] = useState(false);
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
  const handleDownloadDataset = async () => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/dataset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seal
      })
    });
    window.location.reload();
  };
  return (
    <div className="flex flex-col justify-center items-center mt-[20px]">
      <span className="font-bold mb-5">
        Welcome
        {" "}
        {name.toUpperCase()}
        !
      </span>
      <table className="mb-5">
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
      <div className="flex flex-row justify-between">
        <Button
          type="button"
          onClick={handleDownloadDataset}
          disabled={isLoading || downloadCount >= maxDownloadCount}
          className="m-2"
        >
          Download Dataset
        </Button>
        {isAdmin && (
          <Link href={{
            pathname: "/manage-users",
            query: {
              seal
            }
          }}
          >
            <Button
              type="button"
              className="m-2"
            >
              Manage Users
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
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
  const range = [
    userEvent.validFrom.getTime(),
    userEvent.validTo.getTime()
  ];
  const now = (new Date()).getTime();
  if (now < range[0] || now > range[1]) {
    return {
      props: {
        user: null
      }
    };
  }
  const downloads = await getDownloadsFromDbByUserId(prisma, userEvent.userId);
  return {
    props: {
      seal,
      user: {
        id: userEvent.userId,
        email: userEvent.email,
        name: userEvent.name,
        affilation: userEvent.affilation,
        isActive: userEvent.isActive,
        downloadCount: downloads.length,
        maxDownloadCount: userEvent.maxDownloadCount,
        validFrom: range[0],
        validTo: range[1],
        isAdmin: userEvent.isAdmin
      }
    }
  };
};
export default Page;
