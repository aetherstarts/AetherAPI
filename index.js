const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.enable("trust proxy");
app.set("json spaces", 2);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Folder statis untuk UI & Assets
app.use('/', express.static(path.join(__dirname, 'api-page')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Load Settings untuk creator JSON
const settingsPath = path.join(__dirname, './src/settings.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        if (data && typeof data === 'object') {
            const responseData = {
                status: data.status,
                creator: settings.apiSettings.creator || "G4NGGAA",
                ...data
            };
            return originalJson.call(this, responseData);
        }
        return originalJson.call(this, data);
    };
    next();
});

// Auto-load Routes dari folder src/api
let totalRoutes = 0;
const apiFolder = path.join(__dirname, './src/api');

fs.readdirSync(apiFolder).forEach((subfolder) => {
    const subfolderPath = path.join(apiFolder, subfolder);
    if (fs.statSync(subfolderPath).isDirectory()) {
        fs.readdirSync(subfolderPath).forEach((file) => {
            if (path.extname(file) === '.js') {
                require(path.join(subfolderPath, file))(app);
                totalRoutes++;
                console.log(chalk.bgCyan.black(` Loaded Route: ${file} `));
            }
        });
    }
});

console.log(chalk.bgGreen.black(` Total API Loaded: ${totalRoutes} `));

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'api-page', '404.html'));
});

app.listen(PORT, () => {
    console.log(chalk.green.bold(`Server running on http://localhost:${PORT}`));
});

mmodul..export =  ap;
