import * as cheerio from "cheerio";

export default async function handler(req, res) {
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

    const charset = $(`meta`).attr("charset");
    const title = $(`meta[property="og:title"]`).attr("content");
    const description = $(`meta[name="description"]`).attr("content");
    const favicon = $(`link[rel="icon"]`).attr("href");
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

    let twitterTags = [];
    $(`meta`).each((i, el) => {
      if ($(el).attr("name")?.includes("twitter")) {
        const tag = $(el).attr("name");
        const content = $(el).attr("content");
        const str = tag.split(":").pop();
        twitterTags.push({
          title: `Twitter ${str?.charAt(0).toUpperCase() + str?.slice(1)} Test`,
          data: content,
          status: content ? "Passed" : "Failed",
          message: content
            ? `Congratulations! Your webpage is using a ${tag} tag`
            : `Sorry! Your webpage is not using a ${tag} tag`,
        });
      }
    });

    let googleTags = [];
    $(`meta`).each((i, el) => {
      if ($(el).attr("name")?.includes("og")) {
        const tag = $(el).attr("name");
        const content = $(el).attr("content");
        googleTags.push({
          title: tag,
          data: content,
          status: content ? "Passed" : "Failed",
          message: content
            ? `Congratulations! Your webpage is using a ${tag} tag`
            : `Sorry! Your webpage is not using a ${tag} tag`,
        });
      }
    });

    let graphTags = [];
    $(`meta`).each((i, el) => {
      if ($(el).attr("property")?.includes("og")) {
        const tag = $(el).attr("property");
        const content = $(el).attr("content");
        graphTags.push({
          title: tag,
          data: content,
          status: content ? "Passed" : "Failed",
          message: content
            ? `Congratulations! Your webpage is using a ${tag} tag`
            : `Sorry! Your webpage is not using a ${tag} tag`,
        });
      }
    });

    const json = {
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
