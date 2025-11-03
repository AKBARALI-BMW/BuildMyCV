import Resume from "../models/Resume.js"; 
import ai from "../config/ai.js"; 

//  controller for enhancing a resume professional summary
//  POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
    try{
        const {userContent} = req.body;
        if(!userContent){
            return res.status(400).json({message: "User content is required"});
        }
        
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { 
                    role: "system", 
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences, highlighting key skills, experience and career objectives. Make it compelling and ATS friendly. Only return text, no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

//  controller for enhancing a resume job description
//  POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try{
        const {userContent} = req.body;
        if(!userContent){
            return res.status(400).json({message: "User content is required"});
        }
        
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { 
                    role: "system", 
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences, highlighting key responsibilities and achievements. Use action verbs and quantifiable results when possible. Make it ATS friendly. Only return text, no options or anything else." 
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent});
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

//  controller for Uploading a resume to the database 
//  POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try{
        const {resumeText, title} = req.body;
        const userId = req.user.id; // FIXED: req.userId to req.user.id

        if(!resumeText){
            return res.status(400).json({message: "Missing Required Field"});
        }
        
        const systemPrompt = "You are an expert AI agent to extract data from resumes.";
        const userPrompt = `Extract the data from this resume: ${resumeText}. Provide the data in JSON format with no additional text before or after:
        
        {
            "professional_summary": "",
            "skills": [],
            "personal_info": {
                "image": "",
                "fullname": "",
                "profession": "",
                "email": "",
                "phone": "",
                "address": "",
                "website": "",
                "linkedin": "",
                "location": ""
            },
            "experience": [{
                "company": "",
                "position": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "is_current": false
            }],
            "project": [{
                "name": "",
                "type": "",
                "description": ""
            }],
            "education": [{
                "institution": "",
                "degree": "",
                "field": "",
                "graduation_date": "",
                "gpa": ""
            }]
        }`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { 
                    role: "system", 
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {type: 'json_object'}
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData); // FIXED: parsadData to parsedData
        const newResume = await Resume.create({userId, title, ...parsedData});
     
        return res.status(201).json({resumeId: newResume._id});
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}