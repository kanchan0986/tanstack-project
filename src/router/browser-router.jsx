import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import TodoList from "../pages/Todo/TodoList";
import RootLayout from "../Layout/RootLayout";
import TodoLayout from "../Layout/TodoLayout";
import TodoItem from "../pages/Todo/TodoItem";
import ProjectLayout from "../Layout/ProjectLayout";
import ProjectList from "../pages/Project/ProjectList";
import ProjectItem from "../pages/Project/ProjectItem";
import ProductList from "../pages/Product/ProductList";
import ProductItem from "../pages/Product/ProductItem";
import ReadTodoList from "../pages/Todo/ReadTodoList";
import UnreadTodoList from "../pages/Todo/UnreadTodoList";
import DeliveredProjectList from "../pages/Project/DeliveredProjectList";
import UndeliveredProjectList from "../pages/Project/UndeliveredProjectList";

const browserRouter = createBrowserRouter([
    {path: '/', element: <RootLayout />, children: [
        {index: true, element: <Home />},
        {path: 'todo', element: <TodoLayout />, children: [
            {index: true, element: <TodoList />},
            {path: ':id', element: <TodoItem />},
            {path: 'read', element: <ReadTodoList />},
            {path: 'unread', element: <UnreadTodoList />},
        ]},
        {path: 'project', element: <ProjectLayout />, children: [
            {index: true, element: <ProjectList />},
            {path: ':id', element: <ProjectItem />},
            {path: 'delivered', element: <DeliveredProjectList />},
            {path: 'undelivered', element: <UndeliveredProjectList />},
        ]},
        {path: 'product', element: <Outlet/>, children: [
            {index: true, element: <ProductList />},
            {path: ':id', element: <ProductItem />},
        ]},
    ]}
])

export default browserRouter