import * as cheerio from "cheerio";

export default async function handler(req, res) {
  // I found this competition at last time so, code is hard coded in many place sorry :), but want to participate in it so.
  try {
    const { query } = req;
    const { url } = query;
    const data = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const html = await data.text();

    const $ = cheerio.load(html);

    const baseTitle = $(`title`);
    const charset = $(`meta`).attr("charset");
    let title = $(`meta[property="og:title"]`).attr("content");
    title = title ? title : baseTitle.text();
    const description = $(`meta[name="description"]`).attr("content");
    let favicon = $(`link[rel="icon"]`).attr("href");
    favicon = favicon.includes(new URL(url).hostname)
      ? favicon
      : `${new URL(url).origin}${favicon}`;
    const thumbnail = $(`meta[property="og:image"]`).attr("content");
    const canonical = $(`link[rel="canonical"]`).attr("href");
    const basicTags = [
      {
        title: "Charset Test",
        data: charset,
        status: charset ? "Passed" : "Failed",
        message: charset
          ? "Congratulations! Your webpage is using a charset"
          : "Sorry! Your webpage is not using a charset",
      },
      {
        title: "Favicon Test",
        data: favicon,
        status: favicon ? "Passed" : "Failed",
        message: favicon
          ? "Congratulations! Your webpage is using a favicon icon"
          : "Sorry! Your webpage is not using a favicon icon",
        isImage: true,
      },
      {
        title: "Thumbnail Test",
        data: thumbnail,
        status: thumbnail ? "Passed" : "Failed",
        message: thumbnail
          ? "Congratulations! Your webpage is using a thumbnail image"
          : "Sorry! Your webpage is not using a thumbnail image",
        isImage: true,
      },
      // {
      //   title: "Title Test",
      //   data: baseTitle,
      //   status: baseTitle ? "Passed" : "Failed",
      //   message: baseTitle
      //     ? "Congratulations! Your webpage is using a title tag"
      //     : "Sorry! Your webpage is not using a title tag",
      // },
      {
        title: "Meta Title Test",
        data: title,
        status: title ? "Passed" : "Failed",
        message: title
          ? "Congratulations! Your webpage is using a title tag"
          : "Sorry! Your webpage is not using a title tag",
      },
      {
        title: "Meta Description Test",
        data: description,
        status: description ? "Passed" : "Failed",
        message: description
          ? "Congratulations! Your webpage is using a description tag"
          : "Sorry! Your webpage is not using a description tag",
      },
      {
        title: "Canonical Url Test",
        data: canonical,
        status: canonical ? "Passed" : "Failed",
        message: canonical
          ? "Congratulations! Your webpage is using a canonical url"
          : "Sorry! Your webpage is not using a  canonical url",
        isLink: true,
      },
    ];

    let twitterMetaTags = [
      "twitter:card",
      "twitter:title",
      "twitter:description",
    ];
    let twitterTags = [];
    twitterMetaTags.forEach((tag) => {
      const data = $(`meta[name="${tag}"]`).attr("content");
      twitterTags.push({
        title: tag,
        data: data,
        status: data ? "Passed" : "Failed",
        message: data
          ? "Congratulations! Your webpage is using a " + tag + " tag"
          : "Sorry! Your webpage is not using a " + tag + " tag",
      });
    });

    let googleMetaTags = ["googlebot", "google-site-verification"];
    let googleTags = [];
    googleMetaTags.forEach((tag) => {
      const content = $(`meta[name="${tag}"]`).attr("content");
      googleTags.push({
        title: `${tag}`,
        data: content,
        status: content ? "Passed" : "Failed",
        message: content
          ? `Congratulations! Your webpage is using a ${tag} tag`
          : `Sorry! Your webpage is not using a ${tag} tag`,
      });
    });

    let graphTags = [];
    let graphMetaTags = [
      "og:locale",
      "og:type",
      "og:title",
      "og:description",
      "og:url",
      "og:site_name",
      "og:image",
      "og:image:secure_url",
      "og:url",
      "og:site_name",
      "og:locale",
      "og:type",
      "og:title",
      "og:description",
      "og:image",
      "og:image:secure_url",
      "og:image:width",
      "og:image:height",
    ];
    graphMetaTags.forEach((tag) => {
      const content = $(`meta[property="${tag}"]`).attr("content");
      graphTags.push({
        title: `${tag}`,
        data: content,
        status: content ? "Passed" : "Failed",
        message: content
          ? `Congratulations! Your webpage is using a ${tag} tag`
          : `Sorry! Your webpage is not using a ${tag} tag`,
      });
    });

    // let schemaTags = [];
    // let schemaMetaTags = [
    //   "schema:author",
    //   "schema:headline",
    //   "schema:keywords",
    //   "schema:mainEntityOfPage",
    //   "schema:thumbnailUrl",
    //   "schema:uploadDate",
    //   "schema:url",
    // ];
    // schemaMetaTags.forEach((tag) => {
    //   const content = $(`meta[itemprop="${tag}"]`).attr("content");
    //   schemaTags.push({
    //     title: `${tag}`,
    //     data: content,
    //     status: content ? "Passed" : "Failed",
    //     message: content
    //       ? `Congratulations! Your webpage is using a ${tag} tag`
    //       : `Sorry! Your webpage is not using a ${tag} tag`,
    //   });
    // });

    let allTags = [...basicTags, ...twitterTags, ...googleTags, ...graphTags];

    let passedStatus = 0;
    let failedStatus = 0;

    allTags.forEach((tag) => {
      if (tag.status === "Passed") {
        passedStatus++;
      } else {
        failedStatus++;
      }
    });

    const json = {
      status: {
        passed: passedStatus,
        failed: failedStatus,
        total: passedStatus + failedStatus,
      },
      basic: {
        title: "Common Tags",
        tags: basicTags,
      },
      graph: {
        title: "Open Graph Meta Tags",
        tags: graphTags,
      },
      google: {
        title: "Google Tags",
        tags: googleTags,
      },
      twitter: {
        title: "Social Media Tags",
        tags: twitterTags,
      },
    };

    return res.status(200).json(json);
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to Fetch Data",
    });
  }
}
