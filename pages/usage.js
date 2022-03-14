import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Usage() {
  const title = "Usage";
  return (
    <div className={styles.container}>
      <Head>
        <title>{`${title} | AnalyticaHouse Product Analytics`}</title>
        <meta name="description" content={`${title} | AnalyticaHouse`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-3/6 m-auto">
        <main className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
          <p className="mt-2 ">
            This project temporarily doesnt support oAuth, because of
            cache-control and verified callback domains. So you should
            add to service account email to each GA4 Account, manually.
            <li>
              Go to your GA4 Account - Admin - Property Access
              Management
            </li>
            <li>Click Plus (+), add new this user email 👇</li>
            <br />
            <pre>
              {" "}
              <code className={styles.code}>
                starting-account-d6qaj9r8gh1z@quickstart-1646986345355.iam.gserviceaccount.com{" "}
              </code>
            </pre>
            <br />
            <li>And paste your GA4 property ID to this app </li>
          </p>
        </main>
      </div>
      <span className={styles.footer}>
        {" "}
        Made with ❤️ AnalyticaHouse Product Analytics Team
      </span>
    </div>
  );
}
