import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { constants } from "../components/constants";
import Select from "../components/select";

export default function Home(props) {
  const textcontent = constants[0];
  const [message, setMessage] = useState(false);

  const https = "https://";

  const defaultURL = "www.analyticahouse.com";
  const [baseurl, setBaseurl] = useState(defaultURL);
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const changedSource = source ? "?utm_source=" + source : "";
  const changedMedium = medium ? "?utm_medium=" + medium : "";
  const changedCampaign = campaign ? "?utm_campaign=" + campaign : "";
  const changedTerm = term ? "?utm_term=" + term : "";
  const changedContent = content ? "?utm_content=" + content : "";

  const finalURL =
    baseurl +
    changedSource +
    changedMedium +
    changedCampaign +
    changedTerm +
    changedContent;

  const inputStyle =
    "mt-1 p-2 text-left border-2 border-gray-400 rounded-lg flex-1 block w-full text-xs";

  return (
    <div className={styles.container}>
      <div className="w-1/2 m-auto">
        <Head>
          <title>{`${textcontent.title} | AnalyticaHouse Product Analytics`}</title>
          <meta
            name="description"
            content={`${textcontent.title} | AnalyticaHouse`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Link href="/">
            <img
              className="w-24"
              style={{ cursor: "pointer" }}
              src={textcontent.logoURL}
            />
          </Link>

          <h1 className={styles.title}>Campaign URL Builder</h1>
          <p className={styles.description}>
            <Link href="/usage">
              <a>{content.description}</a>
            </Link>
            <br></br>
            <Link href="/json">Go to JSON Generator</Link>
            <br></br>
            <Link href="/pivot">Pivot</Link>
          </p>
          <div className="">
            <div className="m-auto grid grid-cols-6 gap-4">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Base URL"
                  className="block text-sm font-medium text-gray-700"
                >
                  Base URL
                </label>
                <input
                  name="baseURL"
                  onChange={(e) => {
                    setBaseurl(e.target.value);
                  }}
                  placeholder={defaultURL}
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  Your website URL
                </span>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Source"
                  className="block text-sm font-medium text-gray-700"
                >
                  Source URL
                </label>

                <input
                  name="source"
                  onChange={(e) => {
                    setSource(e.target.value);
                  }}
                  placeholder="facebook, google, twitter, etc"
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  Where's the traffic coming from?{" "}
                </span>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Medium"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medium
                </label>
                <input
                  name="medium"
                  onChange={(e) => {
                    setMedium(e.target.value);
                  }}
                  placeholder="email, banner, social, etc"
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  From which medium are visitors arriving?
                </span>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Campaign"
                  className="block text-sm font-medium text-gray-700"
                >
                  Campaign
                </label>
                <input
                  name="campaign"
                  onChange={(e) => {
                    setCampaign(e.target.value);
                  }}
                  placeholder="black friday, christmas, etc"
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  Which effort is driving the traffic?
                </span>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Term"
                  className="block text-sm font-medium text-gray-700"
                >
                  Term
                </label>
                <input
                  name="term"
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  placeholder="running shoes, running, etc"
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  Which paid search traffic keyword led to this visit?
                </span>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <input
                  name="content"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="Hero Banner, Product Page, etc"
                  className={inputStyle}
                />
                <span className="text-xs text-gray-500 font-light">
                  Which content was clicked?
                </span>
              </div>
            </div>
            <div className="grid mb-2 mt-10">
              <label
                htmlFor="FinalURL"
                className="block text-sm font-medium text-gray-700"
              >
                Final URL
              </label>
              <p className="m-2 p-2 text-left border-2 border-gray-400 rounded-lg bg-green-100/40 border-green-400 final-url">
                {https + finalURL}
              </p>
            </div>
            <button
              className={styles.button}
              onClick={() => {
                navigator.clipboard.writeText(finalURL);
                setMessage(true);
                setTimeout(() => {
                  setMessage(false);
                }, 1000);
              }}
            >
              {message ? "Copied 🎉" : " Copy URL"}
            </button>{" "}
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
