import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import bodyParser from "body-parser";
import { promisify } from "util";
import { optionsDimensions } from "../components/dimensions";
import { optionsMetrics } from "../components/metrics";
import { startDates, endDates } from "../components/dates";
import { constants } from "../components/constants";
import Select from "../components/select";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const getBody = promisify(bodyParser.urlencoded());

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }

  if (req.method === "POST") {
    const dimension = req.body?.dimension || ["country"];
    const metric = req.body?.metric || ["totalUsers"];

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

    return {
      props: {
        data: [],
        dimensionList,
        metricList,
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

export default function Json(props) {
  const content = constants[0];

  const [message, setMessage] = useState(false);

  const dimensionList = props.dimensionList
    ? JSON.stringify(props.dimensionList, null, 2)
        .replace("[", " ")
        .replace("[]", "")
        .replace("]", "")
    : null;

  const metricList = props.metricList
    ? JSON.stringify(props.metricList, null, 2)
        .replace("[", " ")
        .replace("[]", "")
        .replace("]", "")
    : null;

  return (
    <div className={styles.container}>
      {dimensionList && (
        <span className="code-description">
          {" "}
          {message ? "Copied 🎉" : " Click to each snippets for copy 📀"}
        </span>
      )}
      {dimensionList && (
        <>
          <h2 className="code-title">Dimensions</h2>
          <SyntaxHighlighter
            language="json"
            onClick={() => {
              navigator.clipboard.writeText(dimensionList);
              setMessage(true);
            }}
          >
            {dimensionList}
          </SyntaxHighlighter>
        </>
      )}
      {metricList && (
        <>
          <h2 className="code-title">Metrics</h2>
          <SyntaxHighlighter
            language="json"
            onClick={() => {
              navigator.clipboard.writeText(metricList);
              setMessage(true);
            }}
          >
            {metricList}
          </SyntaxHighlighter>
        </>
      )}

      <div className="w-1/2 m-auto">
        <Head>
          <title>{`${content.title} | AnalyticaHouse Product Analytics`}</title>
          <meta
            name="description"
            content={`${content.title} | AnalyticaHouse`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Link href="/">
            <img
              className="w-24"
              style={{ cursor: "pointer" }}
              src={content.logoURL}
            />
          </Link>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>
            <Link href="/usage">
              <a>{content.description}</a>
            </Link>
          </p>
          <form method="post">
            {/* <input
              name="propertyID"
              defaultValue={props.propertyID}
              placeholder="Paste Property ID"
              className={styles.input}
            /> */}
            <Select
              key="dimension"
              name="dimension"
              options={optionsDimensions}
            />
            <Select
              key="metric"
              name="metric"
              options={optionsMetrics}
            />
            {/* <Select key="startDate" name="startDate" options={startDates} />
            <Select key="endDate" name="endDate" options={endDates} /> */}

            <button type="submit" className={styles.button}>
              Generate JSON
            </button>
          </form>
          <div className={styles.grid}> </div>
        </main>
        <span className={styles.footer}>
          {" "}
          Made with ❤️ AnalyticaHouse Product Analytics Team
        </span>
      </div>
    </div>
  );
}
