export function cleanLocalResults(localResults) {
  return localResults
    .map((item) => {
      let website = item.website || null;
      if (website) {
        const withoutQuery = website.split("?")[0];
        const parts = withoutQuery.split("/");
        website = parts.length > 3 ? parts.slice(0, 3).join("/") : withoutQuery;
      }
      return {
        businessName: item.title || "No name",
        phone: item.phone || "--",
        website,
      };
    })
    .filter((entry) => entry.website); // skip if no website
}
