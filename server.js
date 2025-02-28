import express from "express";
import cors from "cors";
import FireCrawlApp from "@mendable/firecrawl-js";

const app = express();
const PORT = process.env.PORT || 3000;

const fireCrawl = new FireCrawlApp({
  apiKey: "fc-dd2e9d2d73994c7c8a00523245caa2e8",
});

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { country, language } = req.body;

  try {
    const extractResult = await fireCrawl.extract(
      [`https://bing.com/translator/?to=${language}&text=${encodeURIComponent(country)}`],
      {
        prompt: `extract the country name in destination language with casual tone`,
      }
    );

    console.log("Full Extract Result:", extractResult); // Log full response for debugging

    res.json({ rawOutput: extractResult }); // Send full raw output
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
