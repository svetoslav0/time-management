const Project = require('../models/Project')
const validateProjectData = require('../utils/validateProjectData')

exports.createProject = async (projectData) => {
    const {clientName, projectName, startingDate, pricePerHour, employeeIds} = projectData

    await validateProjectData(clientName, projectName, startingDate, pricePerHour, employeeIds)

    try{
        const project = await Project.create({
            clientName: clientName,
            projectName: projectName, 
            startingDate: startingDate, 
            pricePerHour: pricePerHour, 
            employeeIds: employeeIds,
        })

        return {
            clientName: project.clientName,
            projectName: project.projectName, 
            startingDate: project.startingDate, 
            pricePerHour: project.pricePerHour, 
            employeeIds: project.employeeIds, 
        }
    }catch(error){
        if(error.name === 'ValidationError'){
            throw new Error(error.message)
        }else{
            throw new Error("Trouble creating a new project!");
        }
    }
   
    }