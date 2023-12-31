import { cssBundleHref } from "@remix-run/css-bundle";
import "./tailwind.css";

import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { createSupabaseServerClient } from "./@/lib/supabase.server";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Header from "./@/components/header";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request, params }: LoaderFunctionArgs) {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({ env, session }, { headers: response.headers });
}

export default function App() {
  const { env, session } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      revalidator.revalidate();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const up = () => {
    supabase.auth.signUp({
      email: "",
      password: "000000",
    });
  };
  const ins = async () => {
    const res = await supabase.auth.signInWithPassword({
      email: "",
      password: "000000",
    });
  };

  const out = () => {
    supabase.auth.signOut();
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header session={session} signOut={() => supabase.auth.signOut()} />
        <Outlet context={{ supabase, session }} />
        <button className="py-20 px-0" onClick={up}>
          up
        </button>
        <button className="py-20 px-0" onClick={ins}>
          in
        </button>
        <button className="py-20 px-0" onClick={out}>
          out
        </button>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
