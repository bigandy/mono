import { getServerAuthSession } from "../../server/auth";

export default function withSession(next: any = undefined) {
  return async (ctx: any) => {
    if (!ctx.req.session) {
      ctx.req.session = await getServerAuthSession(ctx);
    }

    const response = next ? await next(ctx) : {};

    if (response.redirect) {
      return response;
    }

    return {
      props: {
        ...response.props,
        session: ctx.req.session,
      },
    };
  };
}
