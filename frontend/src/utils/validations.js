export function cleanTaskText(taskText) {
	return taskText.trim();
}

export function isValidTaskText(taskText) {
	return taskText.trim().length > 0;
}

export function removeTaskById(tasks, id) {
	return tasks.filter((task) => task.id !== id);
}

export function findTaskById(tasks, id) {
	return tasks.find((task) => task.id === id);
}

export function createTaskPayload(taskText) {
	return {
		text: taskText.trim(),
		completed: false,
	};
}