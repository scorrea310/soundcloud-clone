const express = require('express')
const asyncHandler = require('express-async-handler');
const { Song } = require('../../db/models');
const { multipleMulterUpload, singlePublicFileUpload } = require("../../awsS3")

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateUploadSong = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a Title.'),
    handleValidationErrors,
];



// POST '/SONGS'
router.post('/', multipleMulterUpload("files"), asyncHandler(async (req, res) => {

    //TODO: multiplemulterupload
    const { userId, albumId, title } = req.body;

    const imageUrl = await singlePublicFileUpload(req.files[0]);


    const url = await singlePublicFileUpload(req.files[1]);


    const song = await Song.create({ userId, albumId, url, title, imageUrl });


    return res.json(song);
}))



router.put("/:id", multipleMulterUpload("files"), asyncHandler(async (req, res) => {

    const { title } = req.body;

    const id = req.params.id


    const imageUrl = await singlePublicFileUpload(req.files[0]);


    const url = await singlePublicFileUpload(req.files[1]);


    const song = await Song.updateSong({ id: +id, url, title, imageUrl });

    return res.json(song);

}))












module.exports = router;