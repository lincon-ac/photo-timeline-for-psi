const { PhotoDao, UserDao } = require('../infra')
    , jimp = require('jimp')
    , path = require('path')
    , fs = require('fs')
    , unlink = require('util').promisify(fs.unlink);

const api = {}

const userCanDelete = user => photo => photo.userId == user.id;

const defaultExtension = '.jpg';

api.list = async (req, res) => {
    console.log('####################################');
    const { userName } = req.params;
    const { page } = req.query;
    const user = await new UserDao(req.db).findByName(userName);
    if(user) {
        console.log(`Listando fotos`);
        const photos = await new PhotoDao(req.db)
            .listAllFromUser(userName, page);
        res.json(photos);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado'});
    }
    
}

api.add = async (req, res) => {
    console.log('####################################');
    console.log('Dados JSON recebidos', req.body);
    const photo = req.body;
    photo.file = '';
    const id = await new PhotoDao(req.db).add(photo, req.user.id);
    res.json(id);
};

api.addUpload = async (req, res) => {

        console.log('upload completo');
        console.log('Photo data', req.body);
        console.log('File info', req.file);

        const image = await jimp.read(req.file.path);

        await image
            .exifRotate()
            .cover(460, 460)
            .autocrop()
            .write(req.file.path);  
                
        const photo = req.body;
        photo.url = path.basename(req.file.path);
        await new PhotoDao(req.db).add(photo, req.user.id);
        res.status(200).end();       
};

api.findById = async (req, res) => {
    const { photoId } = req.params;
    console.log('####################################');
    console.log(`Procurando foto pot ID ${photoId}`)
    const photo = await new PhotoDao(req.db).findById(photoId);
    if(photo) {
        res.json(photo);
    } else {
        res.status(404).json({ message: 'A foto não existe'})
    }  
};

api.remove = async (req, res) => {
    const user = req.user;
    const { photoId } = req.params;
    const dao = new PhotoDao(req.db);
    const photo = await dao.findById(photoId);
    if(!photo) {
        const message = 'A foto não existe';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanDelete(user)(photo)) {
        await dao.remove(photoId)
        console.log(`Foto ${photoId} deletada!`);
        res.status(200).end();
    } else {
        console.log(`
            Operação inválida. Usuário ${user.id} 
            pode excluir foto do usuário ${photo.userId}
        `);
        res.status(403).json({ message: 'Restrito'});
    }
};

api.like = async (req, res) => {
    const { photoId } = req.params;
    const dao = new PhotoDao(req.db);
    const liked = await dao.likeById(photoId, req.user.id);
    if(liked) {
        console.log(`Usuário ${req.user.name} Curtiu a foto ${photoId}`);
        return res.status(201).end();
    }
    return res.status(304).end();
};

module.exports = api;