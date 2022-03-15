import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function Usage() {
  const title = "Usage";
  const [copy, setCopy] = useState(true);
  const clientEmail =
    "starting-account-s81d1ngszc9q@quickstart-1647295587436.iam.gserviceaccount.com";

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${title} | AnalyticaHouse Product Analytics`}</title>
        <meta name="description" content={`${title} | AnalyticaHouse`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-6/12 m-auto">
        <main className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
          <Link href="/">
            <a>
              {" "}
              <span>👈 Back</span>
            </a>
          </Link>

          <div className="w-full px-4 pt-16 ">
            <div className="w-full  p-2 mx-auto bg-white rounded-2xl">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Adding client-email</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="font-light px-4 pt-4 pb-2 text-sm text-gray-500 overflow-scroll">
                      <p className="mt-2 ">
                        This project temporarily doesnt support oAuth, because
                        of cache-control and verified callback domains. So you
                        should add to service account email to each GA4 Account,
                        manually.
                        <li className="mt-2">
                          Go to your GA4 &#8594; Admin &#8594; Property Access
                          Management
                        </li>
                        <li>Click Plus (+), add new this user email 👇</li>
                        <br />
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(clientEmail);
                            setCopy(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mb-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="-mt-4 text-xs">
                            {" "}
                            {!copy ? "Copied 🎉" : "Click to copy"}
                          </p>
                        </div>
                        <pre>
                          <code className={styles.code}>{clientEmail}</code>
                        </pre>
                        <br />
                        <li>And paste your GA4 property ID to this app </li>
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Controls</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 font-light">
                      You can create a new date range like{" "}
                      <strong className="font-bold">nDaysAgo</strong>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </main>
      </div>
      <span className={styles.footer}>
        {" "}
        Made with ❤️ AnalyticaHouse Product Analytics Team
      </span>
    </div>
  );
}
