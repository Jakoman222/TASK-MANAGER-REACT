import { describe, it, expect } from 'vitest';
import { removeTaskById, isValidTaskText, cleanTaskText } from './validations';

describe('removeTaskById', () => {
    it('elimina una tarea por id', () => {
        const tasks = [
            { id: 1, text: 'Express JS', completed: false },
            { id: 2, text: 'Node JS', completed: true },
            { id: 3, text: 'Flutter Riverpod', completed: false },
        ];

        const result = removeTaskById(tasks, 3);

        expect(result).toEqual([
            { id: 1, text: 'Express JS', completed: false },
            { id: 2, text: 'Node JS', completed: true },
        ]);
    });

    it('todas las tareas eliminadas', () => {
        const tasks = [{ id: 3, text: 'Flutter Riverpod', completed: false }];

        const result = removeTaskById(tasks, 3);

        expect(result).toEqual([]);
    });
});

describe('isValidTaskText', () => {
    it('Validacion del texto sin espacios y con contenido', () => {
        // Arrange
        const text = 'Estudiar Express JS         ';
        // Act
        const resultado = isValidTaskText(text);
        expect(resultado).toBe(true);
    });
});

describe('isValidTaskText', () => {
    it('texto sin contenido pero con espacios', () => {
        // Arrange
        const text = '         ';
        // Act
        const resultado = isValidTaskText(text);
        expect(resultado).toBe(false);
    });
});

describe('cleanTaskText', () => {
    it('No se guarda texto con espacios innecesarios', () => {
        // Arrange
        const text = '  Nueva tarea agregada       ';
        // Act
        const resultado = cleanTaskText(text);
        expect(resultado).toEqual('Nueva tarea agregada');
    });
});
