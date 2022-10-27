import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Header } from '../components/Header'
import { ListItem } from '../components/ListItem'
import { SearchBar } from '../components/SearchBar'
import clipBoard from '../assets/clipboard.svg'

import styles from './Home.module.css'

export interface Item {
  id: string
  title: string
  done: boolean
}

export function Home() {
  const [list, setList] = useState<Item[]>(
    JSON.parse(localStorage.getItem('tasks') || '[]') || []
  )

  function handleAddTask(taskName: string) {
    let newList = [...list]
    newList.push({
      id: uuidv4(),
      title: taskName,
      done: false
    })
    localStorage.setItem('tasks', JSON.stringify(newList))
    setList(newList)
  }

  function handleDeleteTask(id: string) {
    let newList = [...list].filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(newList))

    setList(newList)
  }

  function handleTaskState(id: string) {
    let updateTask = [...list]

    updateTask.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
    })
    localStorage.setItem('tasks', JSON.stringify(updateTask))

    setList(updateTask)
  }

  return (
    <>
      <Header />
      <SearchBar handleAddTask={handleAddTask} />

      <div className={styles.container}>
        <div className={styles.content}>
          <p>
            Tarefas criadas <span>{list.length}</span>
          </p>
          <p>
            Concluídas{' '}
            <span>
              {list.length === 0 ? (
                '0'
              ) : (
                <span>
                  {list.reduce((value, currentValue) => {
                    if (currentValue.done === true) {
                      value++
                    }
                    return value
                  }, 0)}{' '}
                  de {list.length}
                </span>
              )}
            </span>
          </p>
        </div>

        {list.length === 0 ? (
          <div className={styles.noTask}>
            <img src={clipBoard} alt="Ícone de uma prancheta" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <>
            {list.map(item => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  handleTaskState={handleTaskState}
                  handleDeleteTask={handleDeleteTask}
                />
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
