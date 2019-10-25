'use strict'

const Task = use('App/Models/Task')

class TaskController {
	// Principal Page - Show Tasks
	async index({ view }) {
		// tasks es un array que almacena los datos venidos del modelo
		const tasks = await Task.all()

		return view.render('tasks.index', {
			tasks: tasks.toJSON() // Se envían las tasks a la vista
		})
	}

	// Render Add taks
	async add({ view }) {
		return view.render('tasks.add')
	}

	// Action Add taks
	async store({ request, response, view }) {
		const task = new Task()
		task.title = request.input('title')
		task.body = request.input('body')
		await task.save()

		return response.redirect('tasks')
	}

	// Show every task
	async details({ params, view }) {
		const task = await Task.find(params.id)
		return view.render('tasks.detail', {
			task
		})
	}

	// Render update task
	async edit({ params, view }) {
		const task = await Task.find(params.id)
		return view.render('tasks.edit', {
			task
		})
	}

	// Action update task
	async update({ params, request, response }) {
		const task = await Task.find(params.id)
		task.title = request.input('title')
		task.body = request.input('body')
		
		await task.save()

		return response.redirect('/tasks')
	}

	// Delete tasks
	async destroy({ params, response }) {
		const task = await Task.find(params.id)
		
		await task.delete()

		return response.redirect('/tasks')
	}	
}

module.exports = TaskController
