const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// FS MODULE
const index=fs.readFileSync("index.html", "utf-8");
const aboutPage = fs.readFileSync("about.html", "utf-8");
const authorsPage = fs.readFileSync("authors.html", "utf-8");
const kanchanPage = fs.readFileSync("author-kanchan.html", "utf-8");
const garimaPage = fs.readFileSync("author-garima.html", "utf-8");
const contactPage = fs.readFileSync("contact.html", "utf-8");
const writingsPage = fs.readFileSync("writings.html", "utf-8");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database (In-memory storage)
let writings = [
    { id: 1, title: "जब ख़ामोशी बोलने लगी", category: "कविता", readTime: "६ मिनट", description: "कुछ ख़ामोशियाँ खाली नहीं होतीं।", content: "..." },
    { id: 2, title: "अधूरी चीज़ों की खूबसूरती", category: "विचार", readTime: "४ मिनट", description: "हर कहानी का पूरा होना ज़रूरी नहीं।", content: "..." },
    { id: 3, title: "अपने पुराने ख़तों के नाम", category: "संस्मरण", readTime: "७ मिनट", description: "कभी-कभी बीता हुआ समय हमें एक पत्र की तरह मिलता है।", content: "..." }
];

// ==========================================
// STATIC PAGE ROUTES (HTML Views)
// ==========================================

app.get('/', (req, res) => {
    try {
        res.send(index);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/about', (req, res) => {
    try {
        res.send(aboutPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/authors', (req, res) => {
    try {
        res.send(authorsPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/author/kanchan', (req, res) => {
    try {
        res.send(kanchanPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/author/garima', (req, res) => {
    try {
        res.send(garimaPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/writings', (req, res) => {
    try {
        res.send(writingsPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});

app.get('/contact', (req, res) => {
    try {
        res.send(contactPage);
    } catch (error) {
        res.status(500).send("पृष्ठ लोड करने में त्रुटि हुई।");
    }
});


// ==========================================
// CRUD API ROUTES (With Error Handling)
// ==========================================

// 1. CREATE - Add a new writing
app.post('/api/writings', (req, res) => {
    try {
        const { title, category, readTime, description, content } = req.body;
        
        if (!title || !category) {
            return res.status(400).json({ error: "शीर्षक (title) और श्रेणी (category) आवश्यक हैं।" });
        }

        const newWriting = {
            id: writings.length ? writings[writings.length - 1].id + 1 : 1,
            title,
            category,
            readTime: readTime || "५ मिनट",
            description: description || "",
            content: content || ""
        };

        writings.push(newWriting);
        res.status(201).json({ message: "रचना सफलतापूर्वक जोड़ी गई", data: newWriting });
    } catch (error) {
        res.status(500).json({ error: "सर्वर त्रुटि: रचना जोड़ी नहीं जा सकी।" });
    }
});

// 2. READ - Get all writings
app.get('/api/writings', (req, res) => {
    try {
        res.json(writings);
    } catch (error) {
        res.status(500).json({ error: "सर्वर त्रुटि: रचनाएँ प्राप्त नहीं की जा सकीं।" });
    }
});

// 2. READ - Get a single writing by ID
app.get('/api/writings/:id', (req, res) => {
    try {
        const writingId = parseInt(req.params.id);
        if (isNaN(writingId)) {
            return res.status(400).json({ error: "अमान्य आईडी (Invalid ID format)" });
        }

        const writing = writings.find(w => w.id === writingId);
        if (!writing) {
            return res.status(404).json({ error: "रचना नहीं मिली" });
        }

        res.json(writing);
    } catch (error) {
        res.status(500).json({ error: "सर्वर त्रुटि: रचना लोड करने में समस्या हुई।" });
    }
});

// 3. UPDATE - Edit an existing writing by ID
app.put('/api/writings/:id', (req, res) => {
    try {
        const writingId = parseInt(req.params.id);
        if (isNaN(writingId)) {
            return res.status(400).json({ error: "अमान्य आईडी (Invalid ID format)" });
        }

        const writing = writings.find(w => w.id === writingId);
        if (!writing) {
            return res.status(404).json({ error: "रचना नहीं मिली" });
        }

        const { title, category, readTime, description, content } = req.body;
        if (title) writing.title = title;
        if (category) writing.category = category;
        if (readTime) writing.readTime = readTime;
        if (description) writing.description = description;
        if (content) writing.content = content;

        res.json({ message: "रचना सफलतापूर्वक अपडेट हो गई", data: writing });
    } catch (error) {
        res.status(500).json({ error: "सर्वर त्रुटि: रचना अपडेट नहीं की जा सकी।" });
    }
});

// 4. DELETE - Remove a writing by ID
app.delete('/api/writings/:id', (req, res) => {
    try {
        const writingId = parseInt(req.params.id);
        if (isNaN(writingId)) {
            return res.status(400).json({ error: "अमान्य आईडी (Invalid ID format)" });
        }

        const index = writings.findIndex(w => w.id === writingId);
        if (index === -1) {
            return res.status(404).json({ error: "रचना नहीं मिली" });
        }

        const deleted = writings.splice(index, 1);
        res.json({ message: "रचना हटा दी गई है", data: deleted[0] });
    } catch (error) {
        res.status(500).json({ error: "सर्वर त्रुटि: रचना हटाई नहीं जा सकी।" });
    }
});

// Global Fallback Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "कुछ गलत हो गया! सर्वर पर आंतरिक त्रुटि उत्पन्न हुई।" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});