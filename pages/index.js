import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import bodyParser from "body-parser";
import { promisify } from "util";
import { optionsDimensions } from "../components/dimensions";
import { optionsMetrics } from "../components/metrics";
import { startDates, endDates } from "../components/dates";
import Notification from "../components/notification";
import { constants } from "../components/constants";
import Select from "../components/select";

const getBody = promisify(bodyParser.urlencoded());

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }
  const errorCode = res.ok ? false : res.statusCode;

  const propertyIdGA4 = req.body?.propertyID || "277788968";
  const metric = req.body?.metric || ["totalUsers"];
  const dimension = req.body?.dimension || ["country"];
  const startDate = req.body?.startDate || "today";
  const endDate = req.body?.endDate || "today";

  const { BetaAnalyticsDataClient } = require("@google-analytics/data");

  if (req.method === "POST") {
    const credentialsENV = {
      client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
      private_key:
        process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.split("\\n").join("\n"),
    };
    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: credentialsENV,
    });

    const dimensionList = [];
    for (var i = 0; i < dimension.length; i++) {
      var DIMENSION_KEYS = {
        name: dimension[i],
      };
      dimensionList.push(DIMENSION_KEYS);
    }

    const metricList = [];
    for (var i = 0; i < metric.length; i++) {
      var METRIC_KEYS = {
        name: metric[i],
      };
      metricList.push(METRIC_KEYS);
    }

    // Testing selected and converted items
    // console.log("METRIC", metric);
    // console.log("METRIC KEYS", METRIC_KEYS);
    // console.log("METRIC LIST", metricList);
    // console.log("DIMENSION", dimension);
    // console.log("DIMENSION KEYS", DIMENSION_KEYS);
    // console.log("DIMENSION LIST", dimensionList);

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyIdGA4}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: dimensionList,
      metrics: metricList,
    });

    let data = [];

    response.rows.forEach((row) => {
      data.push(row);
    });

    return {
      props: {
        data,
        metric: req.body?.metric,
        propertyID: req.body?.propertyID || "277788968",
        message: req.body ? "OK" : "",
        error: { code: errorCode, message: "Error!" },
      },
    };
  } else {
    return {
      props: {
        data: [],
      },
    };
  }
}

export default function Home(props) {
  const content = constants[0];
  return (
    <div className={styles.container}>
      {props && props.message === "OK" ? (
        <Notification
          title={content.success_title}
          content={content.success_content}
        />
      ) : (
        <Notification
          title={content.onboarding_title}
          content={content.onboarding_content}
        />
      )}
      <div className="w-1/2 m-auto">
        <Head>
          <title>{`${content.title} | AnalyticaHouse Product Analytics`}</title>
          {process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_CLIENT_EMAIL}
          <meta
            name="description"
            content={`${content.title} | AnalyticaHouse`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <img className="w-24" src={content.logoURL} />
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>
            <Link href="/usage">
              <a>{content.description}</a>
            </Link>
          </p>
          <form method="post">
            <input
              name="propertyID"
              defaultValue={props && props.propertyID}
              placeholder="Paste Property ID"
              className={styles.input}
            />
            <Select
              key="dimension"
              name="dimension"
              options={optionsDimensions}
            />
            <Select key="metric" name="metric" options={optionsMetrics} />
            <Select key="startDate" name="startDate" options={startDates} />
            <Select key="endDate" name="endDate" options={endDates} />

            <button type="submit" className={styles.button}>
              Run
            </button>
          </form>
          <div className={styles.grid}>
            {" "}
            {props.data &&
              props.data.map((row, id) => (
                <div key={id} className={styles.card}>
                  <p>
                    <h2>
                      {" "}
                      {row.dimensionValues &&
                        row.dimensionValues.map(function (item, i) {
                          return <li key={i}>{item.value}</li>;
                        })}
                    </h2>
                    <br />
                    <span>
                      {row.metricValues &&
                        row.metricValues.map(function (item, i) {
                          return <li key={i}>{item.value}</li>;
                        })}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        </main>
        <span className={styles.footer}>
          {" "}
          Made with ❤️ AnalyticaHouse Product Analytics Team
        </span>
      </div>
    </div>
  );
}
