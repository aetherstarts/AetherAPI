const axios = require('axios');

module.exports = function(app) {
    // Endpoint OpenAI
    app.get('/api/openai', async (req, res) => {
        const { text } = req.query;
        if (!text) return res.json({ status: false, message: "Masukkan parameter text" });

        try {
            // Menggunakan provider eksternal untuk hasil nyata
            const { data } = await axios.get(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(text)}`);
            res.json({ status: true, result: data.result });
        } catch (e) {
            res.status(500).json({ status: false, error: "Gagal menghubungi AI" });
        }
    });

    // Endpoint Deepseek
    app.get('/api/deepseek', async (req, res) => {
        const { text } = req.query;
        if (!text) return res.json({ status: false, message: "Masukkan parameter text" });

        try {
            const { data } = await axios.get(`https://api.vreden.web.id/api/ai/deepseek?query=${encodeURIComponent(text)}`);
            res.json({ status: true, result: data.result });
        } catch (e) {
            res.status(500).json({ status: false, error: "Gagal menghubungi Deepseek" });
        }
    });
};