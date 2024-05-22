// DragAndDrop.jsx
import React, { useState } from 'react';
import './TaskDrivers.css';

const DragAndDrop = () => {
    const [tasks, setTasks] = useState([
        { 
            id: 1,
            title: 'Tarea 1',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            list: 1
        },
        { 
            id: 2,
            title: 'Tarea 2',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            list: 1
        },
        { 
            id: 3,
            title: 'Tarea 3',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            list: 3
        },
        { 
            id: 4,
            title: 'Tarea 4',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            list: 2
        },
        { 
            id: 5,
            title: 'Tarea 5',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            list: 2
        },
    ]);

    const getList = (list) => {
        return tasks.filter(item => item.list === list)
    }

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.id)
        console.log(item);
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, list) => {
        const itemID = evt.dataTransfer.getData('itemID');
        const item = tasks.find(item => item.id == itemID);
        item.list = list;

        const newState = tasks.map(task => {
            if(task.id === itemID) return item;
            return task
        })

        setTasks(newState);
    }

    return (
        <>
            <h1>
                Tareas de conductores &nbsp;
            </h1>
            <br/>

            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>
                        Tareas por hacer
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 1))}>
                        {getList(1).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='column column--2'>
                    <h3>
                        Tareas en progreso
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 2))}>
                        {getList(2).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='column column--3'>
                    <h3>
                        Tareas realizadas
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 3))}>
                        {getList(3).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>{item.title}</strong>
                                <p className='body'>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default DragAndDrop;
