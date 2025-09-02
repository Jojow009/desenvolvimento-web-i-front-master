const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'cvs.json');

const readCvs = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveCvs = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

exports.getAllCvs = (req, res) => {
    const cvs = readCvs();
    res.json(cvs);
};

exports.getOneCv = (req, res) => {
    const cvs = readCvs();
    const cv = cvs[req.params.id];
    if (cv) {
        res.json(cv);
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};

exports.createCv = (req, res) => {
    const cvs = readCvs();
    const newCv = req.body;
    cvs.push(newCv);
    saveCvs(cvs);
    res.status(201).json({ message: 'Currículo criado com sucesso!', cv: newCv, id: cvs.length - 1 });
};

exports.updateCv = (req, res) => {
    const cvs = readCvs();
    const cvIndex = parseInt(req.params.id);
    if (cvIndex >= 0 && cvIndex < cvs.length) {
        cvs[cvIndex] = { ...cvs[cvIndex], ...req.body };
        saveCvs(cvs);
        res.json({ message: 'Currículo atualizado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};

exports.deleteCv = (req, res) => {
    let cvs = readCvs();
    const cvIndex = parseInt(req.params.id);
    if (cvIndex >= 0 && cvIndex < cvs.length) {
        cvs.splice(cvIndex, 1);
        saveCvs(cvs);
        res.json({ message: 'Currículo excluído com sucesso!' });
    } else {
        res.status(404).json({ message: 'Currículo não encontrado.' });
    }
};