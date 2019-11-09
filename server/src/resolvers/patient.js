const { Patient } = require('../models')
const { UserInputError, ValidationError } = require('apollo-server-express')

const {
  PATIENT_ALREADY_EXISTS,
  PATIENT_DOESNT_EXIST,
  PATIENT_NOTHING_TO_UPDATE
} = require('../error')

module.exports = {
  Patient: {
    dateStart: (root) => (!root.dateStart) ? null : (new Date(root.dateStart)).toUTCString()
  },

  Query: {
    patients: () => {
      return Patient.find()
    }
  },

  Mutation: {
    addPatient: async (_, { name, dateStart }) => {
      const existingPatient = await Patient.findOne({ name })
      if (existingPatient) {
        throw new ValidationError(PATIENT_ALREADY_EXISTS)
      }

      const patient = new Patient({
        name: name,
        dateStart: dateStart
      })

      try {
        await patient.save()
        return patient
      } catch (err) {
        throw new Error(err)
      }
    },
    updatePatient: async (_, { id, name, dateStart }) => {
      const patient = await Patient.findOne({ _id: id })
      if (!patient) {
        throw new ValidationError(PATIENT_DOESNT_EXIST)
      }

      if (!name && !dateStart) {
        throw new UserInputError(PATIENT_NOTHING_TO_UPDATE)
      }

      // Update the item
      if (name) { patient.name = name }
      if (dateStart) { patient.dateStart = dateStart }

      try {
        patient.save()
        return patient
      } catch (err) {
        throw new Error(err)
      }
    },
    removePatient: async (_, { id }) => {
      const patient = await Patient.findOne({ _id: id })
      try {
        patient.remove()
        return true
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
