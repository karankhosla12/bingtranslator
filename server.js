import express from 'express';
import cors from 'cors';
import firecrawl from '@mendable/firecrawl-js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize FireCrawlApp correctly
const firecrawlApp = new firecrawl.default({ apiKey: "fc-dd2e9d2d73994c7c8a00523245caa2e8" });

app.post('/translate', async (req, res) => {
    const { countryList, language } = req.body;
    const translatedCountries = [];

    for (const country of countryList) {
        try {
            const extractResult = await firecrawlApp.extract(
                [`https://bing.com/translator/?to=${language}&text=${encodeURIComponent(country)}`],
                {
                    prompt: `extract the country name in ${country} casual`,
                }
            );

            translatedCountries.push(extractResult[0].result);
        } catch (error) {
            console.error(`Error translating ${country}:`, error);
            translatedCountries.push(`Error translating ${country}`);
        }
    }

    res.json({ translatedCountries });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
