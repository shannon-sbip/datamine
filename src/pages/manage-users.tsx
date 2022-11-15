import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import Papa from "papaparse";
import { useState } from "react";
import getDistinctUsersFromDb from "../lib/getDistinctUsersFromDb";
import getUnsealedData from "../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../lib/getUserEventFromDbByUserId";
import { User } from "../types/user";
import Button from "../ui/Button";
import FormInputField from "../ui/FormInputField";
import useFileReader from "../hooks/useFileReader";
import handleFileUploadTypeConversion from "../lib/handleFileUploadTypeConversion";
import handleUploadDataValidation from "../lib/handleUploadDataValidation";
import postUserUpload from "../lib/postUserUpload";
type PageProps = {
  users: Partial<User>[]
  seal: string
}
const UPLOAD_FIELD_NAME = "user_upload";
const Page: NextPage<PageProps> = ({ users, seal }) => {
  const fileReader = useFileReader();
  const {
    handleSubmit, register, watch
  } = useForm();
  const handleFormFileUpload = (fields: FieldValues) => {
    const file = fields[UPLOAD_FIELD_NAME][0];
    if (!fileReader || !file) {
      return;
    }
    fileReader.onload = async (fileReaderEvent: ProgressEvent<FileReader>) => {
      const csvOutput = fileReaderEvent?.target?.result;
      const { data: uploadData } = Papa.parse(String(csvOutput), { header: true });
      const usersFromFile = handleFileUploadTypeConversion(handleUploadDataValidation(uploadData));
      await postUserUpload(seal, usersFromFile);
      window.location.reload();
    };
    fileReader.readAsText(file);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="overflow-x-auto w-full max-w-7xl flex flex-col">
        <table className="table-auto border-separate border-spacing-2  border border-slate-400">
          <thead>
            <tr className="font-bold">
              <th className="border border-slate-300 px-1">ID</th>
              <th className="border border-slate-300 px-1">NAME</th>
              <th className="border border-slate-300 px-1">AFFILATION</th>
              <th className="border border-slate-300 px-1">IS ADMIN</th>
              <th className="border border-slate-300 px-1">VALID FROM</th>
              <th className="border border-slate-300 px-1">VALID TO</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({
              id, name, affilation, isAdmin, validFrom, validTo
            }) => (
              <tr key={id}>
                <td className="border border-slate-300">{id}</td>
                <td className="border border-slate-300">{name}</td>
                <td className="border border-slate-300">{affilation}</td>
                <td className="border border-slate-300">{isAdmin ? "TRUE" : "FALSE"}</td>
                {validFrom && <td className="border border-slate-300">{(new Date(validFrom)).toISOString()}</td>}
                {validTo && <td className="border border-slate-300">{(new Date(validTo)).toISOString()}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-center items-center">
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
        <form onSubmit={handleSubmit(handleFormFileUpload)} className="flex flex-row justify-center items-center">
          <FormInputField
            name={UPLOAD_FIELD_NAME}
            type="file"
            accept=".csv"
            registerProps={register(UPLOAD_FIELD_NAME)}
          />
          <Button type="submit" disabled={!watch(UPLOAD_FIELD_NAME)?.length}>Upload</Button>
        </form>
      </div>
    </div>
  );
};
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
