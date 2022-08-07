import React, { useState } from "react";
import Navbar from "../../components/Header/Navbar";
import ListHeading from "../../components/Headings/Heading";
import ReportsHeading from "../../components/Header/Report";
import TwitterCard from "../../components/Card/TwitterCard";
import NormalCard from "../../components/Card/NormalCard";
import Tabs from "../../components/Tabs";

function index({ data, lastFetched }) {
  return (
    <div className="bg-orange-50 pb-8">
      <Navbar />
      <div className="w-full min-h-screen px-2 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-6 gap-6 px-4 space-y-4">
          <div className="lg:col-span-4 space-y-2">
            {data && (
              <>
                <ReportsHeading data={data.status} time={lastFetched} />
                <ListHeading tags={data} />
              </>
            )}
          </div>
          <div className="lg:col-span-2" style={{ marginTop: 0 }}>
            {data && (
              <>
                <Tabs
                  tabs={[{ name: "Twitter Card" }, { name: "Normal Card" }]}
                >
                  <TwitterCard
                    className="py-4 px-2"
                    favicon={data["basic"]["tags"][1]["data"]}
                    image={data["basic"]["tags"][2]["data"]}
                    title={data["basic"]["tags"][3]["data"]}
                    description={data["basic"]["tags"][4]["data"]}
                  />
                  <NormalCard
                    className="py-4 px-2"
                    favicon={data["basic"]["tags"][1]["data"]}
                    image={data["basic"]["tags"][2]["data"]}
                    title={data["basic"]["tags"][3]["data"]}
                    description={data["basic"]["tags"][4]["data"]}
                  />
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

export async function getServerSideProps({ req, res, query }) {
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  try {
    // I know passing header in params is unsafe but I don't have any other way - wanna participate in this competition and complete on less time
    let headers = {};
    if (IsJsonString(query?.headers)) {
      headers = JSON.parse(query?.headers);
    }
    const object = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/scan?url=${query.url}`,
      {
        headers: headers,
      }
    );
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=60"
    );
    const data = await object.json();
    return { props: { data, lastFetched: new Date().toUTCString() } };
  } catch (e) {
    const data = {
      statusCode: 500,
      lastFetched: new Date().toUTCString(),
    };
    return { props: { data } };
  }
}
