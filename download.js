export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL required" });
    }

    try {
        const response = await fetch(
            `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
        );

        const data = await response.json();

        return res.status(200).json({
            status: true,
            video: data.video?.noWatermark || null
        });

    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch" });
    }
}
