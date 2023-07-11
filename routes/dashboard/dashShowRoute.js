import express from 'express'
import { verifyRole } from '../../middlewares/Auth.js'
import { checkUpload,updateUploadCheck } from '../../middlewares/Upload.js'
import ShowController from '../../controllers/dashboard/dashShowController.js' 

const router = express.Router()

// Show

router.get('/tv-shows/add-new-show',verifyRole,ShowController.getAddNewShowPage) 
router.get('/tv-shows/edit-show/:id',verifyRole,ShowController.getUpdateShowPage) 
router.get('/tv-shows/delete-show/:id',verifyRole,ShowController.deleteShow)

router.post(
    '/tv-shows/add-show',
    verifyRole,
    checkUpload('image'), 
    ShowController.createShow) 
     
router.post(
    '/tv-shows/show-editted',
    verifyRole,
    updateUploadCheck, 
    ShowController.updateShow) 
    

// Episodes

router.get('/tv-shows/episodes/:id',verifyRole,ShowController.getEpisodesPage) 
router.get('/tv-shows/add-new-episode/:id',verifyRole,ShowController.getAddNewEpisodePage) 
router.get('/tv-shows/episodes/delete-episode/:id',verifyRole,ShowController.deleteEpisode)
router.get('/tv-shows/episodes/edit-episode/:id',verifyRole,ShowController.getEditEpisodePage)

router.post(
    '/tv-shows/add-new-episode/add-episode',
    verifyRole, 
    ShowController.createEpisode) 

router.post(
    '/tv-shows/episodes/edit-episode/episode-editted',
    verifyRole, 
    ShowController.updateEpisode) 

export default router