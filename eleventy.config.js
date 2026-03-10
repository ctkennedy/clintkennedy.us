import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/.well-known");

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.length > 200 ? stripped.substring(0, 200) + "..." : stripped;
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      return url;
    }
  });

  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("dateToRfc822", (dateObj) => {
    return new Date(dateObj).toUTCString();
  });

  // Head filter (take first N items from array)
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // Collections
  eleventyConfig.addCollection("journal", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/journal/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("ideas", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/ideas/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => b.date - a.date);
  });

  // RSS/Atom feeds via plugin
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/journal/feed.xml",
    collection: {
      name: "journal",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Journal",
      subtitle: "Thoughts, reflections, and writing from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/ideas/feed.xml",
    collection: {
      name: "ideas",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Ideas",
      subtitle: "Ideas and explorations from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/projects/feed.xml",
    collection: {
      name: "projects",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Projects",
      subtitle: "Projects and builds from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  // JSON Feed for each section
  eleventyConfig.addPlugin(feedPlugin, {
    type: "json",
    outputPath: "/journal/feed.json",
    collection: {
      name: "journal",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Journal",
      subtitle: "Thoughts, reflections, and writing from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "json",
    outputPath: "/ideas/feed.json",
    collection: {
      name: "ideas",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Ideas",
      subtitle: "Ideas and explorations from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "json",
    outputPath: "/projects/feed.json",
    collection: {
      name: "projects",
      limit: 20
    },
    metadata: {
      language: "en",
      title: "Clint Kennedy — Projects",
      subtitle: "Projects and builds from Clint Kennedy.",
      base: "https://www.clintkennedy.us/",
      author: {
        name: "Clint Kennedy"
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
