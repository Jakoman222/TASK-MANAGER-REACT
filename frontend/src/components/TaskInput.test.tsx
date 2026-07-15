import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TaskInput from './TaskInput';

describe('TaskInput', () => {
	it('renderiza el titulo, input y boton', async () => {
		// Arrange
		const onAddTask = vi.fn();
		render(<TaskInput onAddTask={onAddTask} />);

		// Assert
		expect(
			screen.getByRole('heading', { name: /nueva tarea/i }),
		).toBeInTheDocument();

		expect(
			screen.getByPlaceholderText(/escribe una nueva tarea/i),
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /agregar tarea/i }),
		).toBeInTheDocument();
	});

	it('permitir escribir texto en el input', async ()=>{
		const user = userEvent.setup();
		const onAddTask = vi.fn();

		render(<TaskInput onAddTask={onAddTask}/>)

		const input = screen.getByPlaceholderText(/escribe una nueva tarea/i);
		
		await user.type(input, 'Estudiar Express JS');

		expect(input).toHaveValue('Estudiar Express JS');

	});

	it('limpia el input despues de agregar la tarea', async ()=>{
		const user = userEvent.setup();
		const onAddTask = vi.fn();

		render(<TaskInput onAddTask={onAddTask}/>);

		const input = screen.getByPlaceholderText(/escribe una nueva tarea/i);
		const button = screen.getByRole('button', {name: /agregar tarea/i});

		await user.type(input, 'Avance flutter app con Riverpod');
		await user.click(button);

		expect(input).toHaveValue('');
	})
});