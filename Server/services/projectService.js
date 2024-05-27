const {Project} = require('../models/Project')
const {validateProjectData} = require('../utils/validateProjectData')

exports.create = async (projectData) => {
    const {clientName, projectName, startingDate, pricePerHour, employeedIds} = projectData

    await validateProjectData(clientName, projectName, startingDate, pricePerHour, employeedIds)

    try{
        const project = await Project.create({
            clientName: clientName,
            projectName: projectName, 
            startingDate: startingDate, 
            pricePerHour: pricePerHour, 
            employeedIds: employeedIds,
        })

        return {
            clientName: project.clientName,
            projectName: project.projectName, 
            startingDate: project.startingDate, 
            pricePerHour: project.pricePerHour, 
            employeedIds: project.employeedIds, 
        }
    }catch(error){
        if(error.name === 'ValidationError'){
            throw new Error(error.message)
        }else{
            throw new Error("Trouble creating a new project!");
        }
    }
   
    }