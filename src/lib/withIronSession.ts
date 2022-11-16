import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from "next";
import { IRON_OPTIONS } from "../config";
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, IRON_OPTIONS);
}
// Theses types are compatible with InferGetStaticPropsType
// https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    // eslint-disable-next-line no-unused-vars
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, IRON_OPTIONS);
}
