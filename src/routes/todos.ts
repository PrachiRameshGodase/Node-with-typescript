import { Router, Request, Response } from "express";
import { Todo } from "../models/todos";

type RequestBody = { text: string };
type RequestParam = { todoId: string };

let todos: Todo[] = [];
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ todos: todos });
});

router.post("/todo", (req: Request, res: Response) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added todo", todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req: Request, res: Response) => {
    const params = req.params as RequestParam;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);

    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "Updated too", todos: todos });
    }
    res.status(404).json({ message: "Could not find todo for this id" });
});

router.delete('/todo/:todoId', (req: Request, res: Response) => {
    const params = req.params as RequestParam;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({ message: "Deleted todo", todos: todos });
});

export default router;
