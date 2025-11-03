import imagekit from "../config/imageKit.js";
import Resume from "../models/Resume.js";  
import fs from "fs";


//  controller for creating a new resume
//  post: /api/resumes/create

export const createResume = async (req, res) => { // CHANGED: resumeCreate to createResume
try{
    const userId = req.user.id; // CHANGED: req.userId to req.user.id
    const {title} = req.body;

    // create new resume 
    const newResume = await Resume.create({userId, title});
    // return the success message 
    return res.status(201).json({message: "Resume created successfully", resume: newResume});
}
catch(error){
    return res.status(500).json({message: "Server error", error: error.message});   
}

}

//   controller for deleting a resume
//   Delete: /api/resumes/delete

export const deleteResume = async (req, res) => {
try{
    const userId = req.user.id; // CHANGED: req.userId to req.user.id
    const {resumeId} = req.params;
  
    await Resume.findOneAndDelete({userId, _id: resumeId})

    // return the success message 
    return res.status(200).json({message: "Resume deleted successfully"}); // REMOVED: wrong code
}
catch(error){
    return res.status(400).json({message: error.message});   
}

}


//  get user resume by id 
//  Get: /api/resumes/get

export const getResumeById = async (req, res) => {
try{
    const userId = req.user.id; // CHANGED: req.userId to req.user.id
    const {resumeId} = req.params;

    const resume = await Resume.findOne({userId, _id: resumeId}); // CHANGED: Resume.create to Resume.findOne, lowercase 'resume'
    if(!resume){
        return res.status(404).json({message: "Resume not found"});
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return res.status(200).json({resume});
}
catch(error){
    return res.status(400).json({message: error.message});   
}

}

//  get resume by id public
//  Get: /api/resumes/public/:resumeId

export const getPublicResumeById = async (req, res) => {
try{
    const {resumeId} = req.params;
    const resume = await Resume.findOne({public: true, _id: resumeId}); // CHANGED: Resume to resume, pubic to public
    if(!resume){
        return res.status(404).json({message: "Resume not found"});
    }
    return res.status(200).json({resume});
}catch(error){
    return res.status(400).json({message: error.message});   
}

}

// controller for updating a resume
// PUT: api/resumes/update

export const updateResume = async (req, res) => { 

    try {
    const userId = req.user.id;
    const {resumeId, resumeData, removeBackground} = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);


    if(image){
        const imageBufferData = fs.createReadStream(image.path)

        const response = await imagekit.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resume',
        transformation:{
            pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove':'')
        }
        });
        resumeDataCopy.personal_info.image = response.url
    }

    const resume = await Resume.findOneAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true}); // FIXED: added findOne condition
    
        return res.status(200).json({message: "Save is successful", resume}); 
    }
    catch (error) { 
    return res.status(400).json({message: error.message})
    }
}