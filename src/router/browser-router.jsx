import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import TodoList from "../pages/Todo/TodoList";
import RootLayout from "../Layout/RootLayout";
import TodoLayout from "../Layout/TodoLayout";
import TodoItem from "../pages/Todo/TodoItem";
import ProjectLayout from "../Layout/ProjectLayout";
import ProjectList from "../pages/Project/ProjectList";
import ProjectItem from "../pages/Project/ProjectItem";
import SpecialTodoList from "../pages/Todo/SpecialTodoList";
import ProductList from "../pages/Product/ProductList";
import ProductItem from "../pages/Product/ProductItem";
import SpecialProjectList from "../pages/Project/SpecialProjectList";

const browserRouter = createBrowserRouter([
    {path: '/', element: <RootLayout />, children: [
        {index: true, element: <Home />},
        {path: 'todo', element: <TodoLayout />, children: [
            {index: true, element: <TodoList />},
            {path: ':id', element: <TodoItem />},
            {path: 'special', element: <SpecialTodoList />},
        ]},
        {path: 'project', element: <ProjectLayout />, children: [
            {index: true, element: <ProjectList />},
            {path: ':id', element: <ProjectItem />},
            {path: 'special', element: <SpecialProjectList />},
        ]},
        {path: 'product', element: <Outlet/>, children: [
            {index: true, element: <ProductList />},
            {path: ':id', element: <ProductItem />},
        ]},
    ]}
])

export default browserRouter